import { expect, jest, test } from "@jest/globals";
import readlineSync from "readline-sync";

test.each([
  ["brain-even", "no"],
  ["brain-calc", "2"],
  ["brain-gcd", "1"],
  ["brain-prime", "no"],
  ["brain-progression", "1"],
])("%s connects the CLI, game generator and engine", async (command, answer) => {
  jest.spyOn(Math, "random").mockReturnValue(0);
  const input = jest
    .spyOn(readlineSync, "question")
    .mockReturnValueOnce("Ada")
    .mockReturnValue(answer);
  const output = jest.spyOn(console, "log").mockImplementation(() => {});
  await import(`../bin/${command}.js`);
  expect(input).toHaveBeenCalledTimes(4);
  expect(output.mock.calls.flat().filter((line) => line === "Correct!")).toHaveLength(3);
  expect(output).toHaveBeenLastCalledWith("Congratulations, Ada!");
});

test("brain-games prints the welcome message and greets the user", async () => {
  const input = jest.spyOn(readlineSync, "question").mockReturnValue("Ada");
  const output = jest.spyOn(console, "log").mockImplementation(() => {});
  await import("../bin/brain-games.js");
  expect(input).toHaveBeenCalledTimes(1);
  expect(output.mock.calls.flat()).toEqual(["Welcome to the Brain Games!", "Hello, Ada!"]);
});
