# Real recipe program executed by the OS shell, never imported by unittest.
import json
import os
import sys
import time

action, target, *args = sys.argv[1:]


def log(event: str) -> None:
    with open("execution.jsonl", "a", encoding="utf-8") as file:
        file.write(
            json.dumps(
                {
                    "event": event,
                    "action": action,
                    "target": target,
                    "args": args,
                    "cwd": os.getcwd(),
                    "pid": os.getpid(),
                },
                ensure_ascii=False,
            )
            + "\n"
        )


def read(name: str) -> str:
    with open(name, encoding="utf-8") as file:
        return file.read()


def output(content: str) -> None:
    directory = os.path.dirname(target)
    if directory:
        os.makedirs(directory, exist_ok=True)
    with open(target, "w", encoding="utf-8", newline="") as file:
        file.write(content)


def main() -> int:
    log("start")
    if action == "copy":
        output(read(args[0]))
    elif action == "upper":
        output(read(args[0]).upper())
    elif action == "join":
        output("|".join(read(name) for name in args))
    elif action == "write":
        output(" ".join(args))
    elif action == "append":
        with open(target, "a", encoding="utf-8", newline="") as file:
            file.write(" ".join(args))
    elif action == "inspect":
        output(
            json.dumps(
                {
                    "args": args,
                    "cwd": os.getcwd(),
                    "exported": os.environ.get("CBUILD_E2E_EXPORTED"),
                    "private": os.environ.get("CBUILD_E2E_PRIVATE"),
                },
                ensure_ascii=False,
            )
        )
    elif action == "fail":
        log("failure")
        sys.stderr.write("RECIPE_FAILURE_SENTINEL\n")
        return int(args[0] if args else 7)
    elif action == "overlap":
        with open(target + ".started", "w", encoding="utf-8") as file:
            file.write("started")
        deadline = time.monotonic() + 4
        while not os.path.exists(args[0] + ".started"):
            if time.monotonic() > deadline:
                raise Exception("Sibling job did not start concurrently")
            time.sleep(0.01)
        output(target)
    elif action == "stream":
        sys.stdout.write("STDOUT_SENTINEL\n")
        sys.stderr.write("STDERR_SENTINEL\n")
        output("stream-complete")
    else:
        raise Exception("Unknown test action: " + action)
    log("end")
    return 0


try:
    sys.exit(main())
except Exception as error:
    log("failure")
    sys.stderr.write(str(error) + "\n")
    sys.exit(9)
