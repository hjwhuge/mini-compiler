import { test, expect } from "vitest";
import { compiler } from "../src";
test("compiler", () => {
  expect(compiler("(add 2 (subtract 4 2))")).toEqual("add(2, subtract(4, 2));");
});
