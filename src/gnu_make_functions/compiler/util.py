from cbuild_compiler.ir import FunctionIR


class util:
    @staticmethod
    def clean_ws(ir: FunctionIR) -> None:
        for val_ir in ir.args:
            for i in range(len(val_ir.parts) - 1, -1, -1):
                x = val_ir.parts[i]
                if x.kind == "text":
                    if len(x.lexeme.strip()) == 0:
                        del val_ir.parts[i]
