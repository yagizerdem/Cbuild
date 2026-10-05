export class LineReader {
  private readonly program: string;
  constructor(program: string) {
    this.program = program;
  }

  public splitLines(): string[] {
    return this.program.split(/\n/).filter((line) => line.trim() !== "");
  }
}
