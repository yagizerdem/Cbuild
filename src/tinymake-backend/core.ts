import { CBuildOptions } from "@src/cli.js";
import { TinyMakeEnv } from "@tinymake-backend/env.js";
import { TinyMake } from "@tinymake-backend/tiny-make.js";

export async function tinyMakeBackend(
  options: CBuildOptions,
  targets: string[],
) {
  const raw = `
A = 10
B = $(A)
EMPTY=
BR= $(EMPTY) $(EMPTY) 
app: yagiz
\t echo hello world

yagiz: erdem
\t echo yagiz

erdem: test
\t echo erdem


`;

  const context: TinyMakeEnv = new TinyMakeEnv(options);

  const tinyMake = new TinyMake(raw, context);
  tinyMake.run();
}
