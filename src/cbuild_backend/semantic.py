from cbuild_compiler.ir import (
    IR,
    AssignmentIR,
    AssignmentType,
    ConditionalIR,
    DefineIR,
    ExportIR,
    HookIR,
    IncludeIR,
    NormalRuleIR,
    StaticPatternRuleIR,
    TargetRuleIR,
    UndefineIR,
    ValuePart,
    VpathIR,
)
from type.cbuild_exception import CbuildException, ErrorType, MachineCode


def is_compatible(instructions: list[IR]) -> bool:
    try:
        _validate_compatibility(instructions)
        return True
    except Exception as error:
        if isinstance(error, CbuildException):
            # maybe log in the future idk
            raise error
        raise error


def _validate_compatibility(instructions: list[IR]) -> None:
    for ir in instructions:
        _validate_ir(ir)


def _validate_ir(ir: IR) -> None:
    if not allowed_ir(ir):
        raise CbuildException(
            column=ir.col,
            row=ir.row,
            error_type=ErrorType.SEMANTIC,
            machine_code=MachineCode.UNSUPPORTED_IR,
            message=f"buildFile: Unsupported IR type for cbuild backend: {ir}. Stop.",
        )

    if isinstance(ir, AssignmentIR):
        _validate_assignment(ir)
        return

    if isinstance(ir, NormalRuleIR):
        _validate_normal_rule(ir)

    if isinstance(ir, HookIR):
        # do not need to validate hookIR parser already handles it
        pass


def _validate_assignment(assignment_ir: AssignmentIR) -> None:
    _validate_parts(
        assignment_ir.left.parts if assignment_ir.left else [],
        assignment_ir,
        "Assignment left-hand side",
    )

    _validate_parts(
        assignment_ir.right.parts if assignment_ir.right else [],
        assignment_ir,
        "Assignment right-hand side",
    )

    prefix = (assignment_ir.prefix.strip() if assignment_ir.prefix else None) or None

    if not _validate_assignment_flavor(assignment_ir.type):
        raise CbuildException(
            column=assignment_ir.col,
            row=assignment_ir.row,
            error_type=ErrorType.SEMANTIC,
            machine_code=MachineCode.UNSUPPORTED_IR,
            message=f"Unsupported assignment type for cbuild backend: {assignment_ir.type}",
        )


def _validate_normal_rule(normal_rule_ir: NormalRuleIR) -> None:
    # if len(normal_rule_ir.order_only_prerequisites) > 0:
    #     raise CbuildException(
    #         column=normal_rule_ir.col,
    #         row=normal_rule_ir.row,
    #         error_type=ErrorType.SEMANTIC,
    #         machine_code=MachineCode.UNSUPPORTED_IR,
    #         message="Order-only prerequisites are not supported by the cbuild backend",
    #     )

    for target in normal_rule_ir.targets:
        _validate_parts(target.parts, normal_rule_ir, "Rule target")

    for prerequisite in normal_rule_ir.prerequisites:
        _validate_parts(prerequisite.parts, normal_rule_ir, "Rule prerequisite")

    for recipe in normal_rule_ir.recipes:
        # if recipe.recipe.kind == "conditional":
        #     raise CbuildException(
        #         column=normal_rule_ir.col,
        #         row=normal_rule_ir.row,
        #         error_type=ErrorType.SEMANTIC,
        #         machine_code=MachineCode.UNSUPPORTED_IR,
        #         message="Conditional recipes are not supported by the cbuild backend",
        #     )
        pass


def _validate_parts(parts: list[ValuePart], owner: IR, context: str) -> None:
    for part in parts:
        # function calls are now allowed
        # if part.kind == "function-call":
        #     raise CbuildException(
        #         column=owner.col,
        #         row=owner.row,
        #         error_type=ErrorType.SEMANTIC,
        #         machine_code=MachineCode.UNSUPPORTED_IR,
        #         message=f"{context} contains an unsupported function call: {part}",
        #     )
        pass


def _validate_assignment_flavor(type: AssignmentType) -> bool:
    return True  # All assignment flavors are considered valid for the cbuild backend


def allowed_ir(ir: IR) -> bool:
    return (
        isinstance(ir, AssignmentIR)
        or isinstance(ir, NormalRuleIR)
        or isinstance(ir, HookIR)
        or isinstance(ir, ConditionalIR)
        or isinstance(ir, DefineIR)
        or isinstance(ir, UndefineIR)
        or isinstance(ir, ExportIR)
        or isinstance(ir, VpathIR)
        or isinstance(ir, IncludeIR)
        or isinstance(ir, StaticPatternRuleIR)
        or isinstance(ir, TargetRuleIR)
    )
