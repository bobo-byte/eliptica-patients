import { expect, test, describe } from "@jest/globals";
import { OmitRecursively } from "../../utils/types/helpers";

describe("to test helper types", () => {
  test("without keys", () => {
    type MyType = {
      a: string;
      b: number;
      c: boolean;
      d: string;
      e: number;
    };

    type MyTypeWithoutE = Omit<MyType, "e">;

    const input: MyType = { a: "hello", b: 123, c: true, d: "world", e: 456 };

    const output: MyTypeWithoutE = input;

    expect(output).not.toBe({
      a: "hello",
      b: 123,
      c: true,
      d: "world",
      e: 456,
    });
  });
  test("without keys mapped", () => {
    type MyType = {
      a: { x: number; y: string };
      b: { x: number; y: string };
      c: { x: number; y: string };
      d: { x: number; y: string };
      e: { x: number; y: string; z: number };
    };

    const input: MyType = {
      a: { x: 123, y: "hello" },
      b: { x: 456, y: "world" },
      c: { x: 789, y: "foo" },
      d: { x: 321, y: "bar" },
      e: { x: 654, y: "baz", z: 333 },
    };

    type withoutZ = OmitRecursively<MyType, "z">;

    const output: withoutZ = input;

    expect(output).not.toBe({
      a: { x: 123, y: "hello" },
      b: { x: 456, y: "world" },
      c: { x: 789, y: "foo" },
      d: { x: 321, y: "bar" },
      e: { x: 654, y: "baz", z: 333 },
    });
  });
});
