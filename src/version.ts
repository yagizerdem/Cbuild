import packageJson from "../package.json" with { type: "json" };

export function printVersionInfo() {
  console.log(`CBuild ${packageJson.version}
Built for ${process.platform}-${process.arch}
Copyright (C) 2026 Yagiz Erdem
License MIT: MIT License
This is free software: you are free to use, copy, modify, merge,
publish, distribute, sublicense, and/or sell copies of the Software.
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND.`);
}
