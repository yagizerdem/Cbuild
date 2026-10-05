import { LineParser, LineReader } from "@tinymake-backend/read-line.js";

export class TinyMake {
  private rawBuildFile: string;
  constructor(rawBuildFile: string) {
    this.rawBuildFile = rawBuildFile;
  }

  async run() {
    const lineReader = new LineReader(this.rawBuildFile);
    const classifiedLines = lineReader.read();

    const lineParser = new LineParser(classifiedLines);
    lineParser.parse();
  }
}
