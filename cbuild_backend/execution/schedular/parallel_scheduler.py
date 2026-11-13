import os
import time
from concurrent.futures import FIRST_COMPLETED, Future, ThreadPoolExecutor, wait
from typing import Final

from cbuild_backend.env import Env
from cbuild_backend.execution.build import Build
from cbuild_backend.execution.schedular.data_structure import (
    RuleUUID,
    create_reverse_target_map,
    create_target_map,
)
from cbuild_backend.model import NormalRule
from cbuild_backend.os import get_os_info
from type.cbuild_exception import CbuildException, ErrorType, MachineCode


class ParallelScheduler:
    def __init__(self, context: Env, rules: list[NormalRule]) -> None:
        self._context: Final = context
        self._explicit_rules: Final = rules

        # holds uuid of rules in diffent build stages
        self._current_builds: set[RuleUUID] = set()
        self._blocked_builds: set[RuleUUID] = set()
        self._completed_builds: set[RuleUUID] = set()
        self._failed_builds: set[RuleUUID] = set()

        # maps futures of currently running builds to their rule uuid
        self._running_builds: dict[Future[None], RuleUUID] = {}

        # graph data strucure for tracking target dependencies
        self._target_map: Final = create_target_map(rules)
        self._reverse_target_map: Final = create_reverse_target_map(rules)
        self._target_preq_count: dict[RuleUUID, int] = {}
        self._rules_by_uuid: dict[RuleUUID, NormalRule] = {}

        self._create_target_preq_count_map()
        self._create_rules_by_uuid_map()

    def _create_target_preq_count_map(self) -> None:
        self._target_preq_count = {}
        for rule in self._explicit_rules:
            target_prerequisites = self._target_map.get(rule.uuid, [])
            self._target_preq_count[rule.uuid] = len(
                set(preq_rule.uuid for preq_rule in target_prerequisites)
            )

    def _create_rules_by_uuid_map(self) -> None:
        self._rules_by_uuid = {}
        for rule in self._explicit_rules:
            self._rules_by_uuid[rule.uuid] = rule

    def _get_next_builds(self, count: int) -> list[str]:
        next_builds: list[str] = []
        next_rules = [
            uuid
            for uuid in self._get_rules_with_no_prerequisites()
            if uuid not in self._failed_builds
            and uuid not in self._blocked_builds
            and uuid not in self._completed_builds
            and uuid not in self._current_builds
        ]
        for _ in range(count):
            next_rule_uuid = next_rules.pop() if next_rules else None
            if not next_rule_uuid:
                break
            next_builds.append(next_rule_uuid)
        return next_builds

    def _get_rules_with_no_prerequisites(self) -> list[str]:
        rules_with_no_prerequisites: list[str] = []
        for uuid, count in self._target_preq_count.items():
            if count == 0:
                rules_with_no_prerequisites.append(uuid)
        return rules_with_no_prerequisites

    # recursively block dependents of a failed build
    def _block_dependents(self, uuid: str) -> None:
        dependents = self._reverse_target_map.get(uuid, [])

        for dependent in dependents:
            dependent_uuid = dependent.uuid

            if (
                dependent_uuid in self._blocked_builds
                or dependent_uuid in self._failed_builds
            ):
                continue

            self._blocked_builds.add(dependent_uuid)
            self._block_dependents(dependent_uuid)

    # Runs on a worker thread; only the build itself happens here.
    def _run_build(self, rule: NormalRule) -> None:
        build = Build(self._context, self._explicit_rules)
        build.build_target(rule)

    # Runs on the scheduler thread so the bookkeeping sets are never shared.
    def _finish_build(self, uuid: str, build_future: Future[None]) -> None:
        try:
            build_future.result()
            self._completed_builds.add(uuid)
            dependents = self._reverse_target_map.get(uuid, [])
            for dependent in dependents:
                count = self._target_preq_count.get(dependent.uuid)
                if count is None:
                    continue
                self._target_preq_count[dependent.uuid] = max(0, count - 1)
        except Exception as error:
            if self._context.cli_options.keep_going:
                self._failed_builds.add(uuid)
                self._block_dependents(uuid)
            else:
                raise error
        finally:
            self._current_builds.discard(uuid)

    def _can_start_job(self) -> bool:
        max_load = self._context.cli_options.load_average
        if max_load is None:
            return True
        os_info = get_os_info()
        current_load = os_info["load_average"][0]
        return current_load < max_load

    def _ensure_not_sequential(self) -> None:
        if self._context.cli_options.sequential:
            # programmatic exception
            raise Exception(
                "Cannot perform parallel build when sequential mode is enabled"
            )

    def _throw_if_build_failed(self) -> None:
        if len(self._failed_builds) == 0:
            return

        raise CbuildException(
            column=-1,
            row=-1,
            error_type=ErrorType.PROCESS,
            machine_code=MachineCode.BUILD_FAILED,
            message="cbuild: Target(s) failed; build incomplete.",
        )

    def _ensure_concurrency_is_positive_integer(self, concurrency: int) -> None:
        if concurrency <= 0:
            raise CbuildException(
                column=-1,
                row=-1,
                error_type=ErrorType.PROCESS,
                machine_code=MachineCode.UNSUPPORTED,
                message="cbuild: the '-j' option requires a positive integer argument",
            )

    def parallel_schedule(self) -> None:
        self._ensure_not_sequential()
        concurrency = (
            self._context.cli_options.jobs
            if self._context.cli_options.jobs is not None
            else 1
        )
        self._ensure_concurrency_is_positive_integer(concurrency)

        executor = ThreadPoolExecutor(max_workers=concurrency)
        try:
            if self._context.cli_options.print_directory:
                print(f"cbuild: Entering directory '{os.getcwd()}'")

            while len(self._completed_builds) + len(self._failed_builds) + len(
                self._blocked_builds
            ) < len(self._explicit_rules):
                if len(self._current_builds) < concurrency:
                    if not self._can_start_job():
                        time.sleep(0.1)
                        continue
                    available_slots = concurrency - len(self._current_builds)
                    next_builds = self._get_next_builds(available_slots)

                    for uuid in next_builds:
                        rule = self._rules_by_uuid.get(uuid)
                        if not rule:
                            raise Exception(f'Rule with uuid "{uuid}" does not exist')
                        self._current_builds.add(uuid)
                        build_future = executor.submit(self._run_build, rule)
                        self._running_builds[build_future] = uuid

                if len(self._running_builds) == 0:
                    if len(self._completed_builds) + len(self._failed_builds) + len(
                        self._blocked_builds
                    ) < len(self._explicit_rules):
                        raise Exception(
                            "cbuild: Build graph is stuck. A circular dependency or malformed cli option may exist."
                        )
                    break

                # Wake the scheduler immediately when any build finishes.
                done, _ = wait(self._running_builds, return_when=FIRST_COMPLETED)
                for finished in done:
                    self._finish_build(self._running_builds.pop(finished), finished)

            self._throw_if_build_failed()
        finally:
            # Let already started recipes finish; never start queued ones.
            executor.shutdown(wait=True, cancel_futures=True)
            if self._context.cli_options.print_directory:
                print(f"cbuild: Leaving directory '{os.getcwd()}'")
