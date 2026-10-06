import { CBuildOptions } from "@src/cli.js";
import { TinyMakeEnv } from "@tinymake-backend/env.js";
import { TinyMake } from "@tinymake-backend/tiny-make.js";

export async function tinyMakeBackend(options: CBuildOptions, args: string[]) {
  const raw = `
A = 10
B = $(A)
EMPTY=
BR= $(EMPTY) $(EMPTY) 
app : yagiz erdem
\t echo hello world

yagiz:
\t echo yagiz

erdem: app 
\t echo erdem


`;

  const context: TinyMakeEnv = new TinyMakeEnv();

  const tinyMake = new TinyMake(raw, context);
  tinyMake.run();
}
