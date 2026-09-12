export class Interpreter {
  run(code: string) {
    console.log(code);
  }
}

const globalInterpreter = new Interpreter();
export default globalInterpreter;
