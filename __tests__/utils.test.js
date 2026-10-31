import { expect, jest, test } from "@jest/globals";
import { getRandomNumber } from "../src/utils.js";

test.each([
  [0, 1, 100, 1],
  [0.999999, 1, 100, 100],
  [0.5, 1, 10, 6],
  [0, -5, 5, -5],
  [0.999999, -5, 5, 5],
  [0.7, 4, 4, 4],
])("random %s in [%i, %i] produces %i", (random, min, max, expected) => {
  jest.spyOn(Math, "random").mockReturnValue(random);
  expect(getRandomNumber(min, max)).toBe(expected);
});
