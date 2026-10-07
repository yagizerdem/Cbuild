export type TValue = "int" | "double" | "boolean" | "object" | "null";

class yValue {
  public valType: TValue;
  public data: any;

  constructor(valType: TValue, data: any) {
    this.valType = valType;
    this.data = data;
  }

  static int(value: number): yValue {
    return new yValue("int", value);
  }

  static double(value: number): yValue {
    return new yValue("double", value);
  }

  static boolean(value: boolean): yValue {
    return new yValue("boolean", value);
  }

  static object(value: object): yValue {
    return new yValue("object", value);
  }

  static null(): yValue {
    return new yValue("null", null);
  }
}
