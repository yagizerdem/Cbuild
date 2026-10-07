export type TValue = "int" | "double" | "boolean" | "object" | "null";

export class yValue {
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

  public isTruthy(): boolean {
    switch (this.valType) {
      case "boolean":
        return this.data;

      case "int":
      case "double":
        return this.data !== 0;

      case "null":
        return false;

      case "object":
        return true;
    }
  }

  public equals(other: yValue): boolean {
    if (this.valType !== other.valType) {
      return false;
    }

    switch (this.valType) {
      case "int":
      case "double":
      case "boolean":
        return this.data === other.data;

      case "null":
        return true;

      case "object":
        return this.data === other.data;
    }
  }
}
