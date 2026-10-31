import { beforeEach, expect, jest, test } from "@jest/globals";
import readlineSync from "readline-sync";
import runGame from "../src/index.js";
import { userGreeting } from "../src/cli.js";

let output;
let input;

beforeEach(() => {
  output = jest.spyOn(console, "log").mockImplementation(() => {});
  input = jest.spyOn(readlineSync, "question");
});

test("greets the user by the entered name", () => {
  input.mockReturnValue("Ada Lovelace");
  userGreeting();
  expect(input).toHaveBeenCalledTimes(1);
  expect(input).toHaveBeenCalledWith("May I have your name? ");
  expect(output).toHaveBeenCalledTimes(1);
  expect(output).toHaveBeenCalledWith("Hello, Ada Lovelace!");
});

test("asks three distinct questions and congratulates after three correct answers", () => {
  input
    .mockReturnValueOnce("Ada")
    .mockReturnValueOnce("2")
    .mockReturnValueOnce("4")
    .mockReturnValueOnce("6");
  const getGameData = jest
    .fn()
    .mockReturnValueOnce({ question: "1 + 1", correctAnswer: "2" })
    .mockReturnValueOnce({ question: "2 + 2", correctAnswer: "4" })
    .mockReturnValueOnce({ question: "3 + 3", correctAnswer: "6" });
  runGame("Calculate", getGameData);
  expect(getGameData).toHaveBeenCalledTimes(3);
  expect(input.mock.calls).toEqual([
    ["May I have your name? "],
    ["Your answer: "],
    ["Your answer: "],
    ["Your answer: "],
  ]);
  expect(output.mock.calls.flat()).toEqual([
    "Welcome to the Brain Games!",
    "Hello, Ada!",
    "Calculate",
    "Question: 1 + 1",
    "Correct!",
    "Question: 2 + 2",
    "Correct!",
    "Question: 3 + 3",
    "Correct!",
    "Congratulations, Ada!",
  ]);
});

test.each([1, 2, 3])("stops immediately on a wrong answer in round %i", (round) => {
  input.mockReturnValueOnce("Ada");
  for (let i = 1; i < round; i += 1) input.mockReturnValueOnce("yes");
  input.mockReturnValueOnce("no");
  const getGameData = jest.fn(() => ({ question: 2, correctAnswer: "yes" }));
  runGame("Is it even?", getGameData);
  expect(getGameData).toHaveBeenCalledTimes(round);
  expect(input).toHaveBeenCalledTimes(round + 1);
  expect(output.mock.calls.flat().filter((line) => line === "Correct!")).toHaveLength(round - 1);
  expect(output.mock.calls.slice(-2).flat()).toEqual([
    "'no' is wrong answer ;(. Correct answer was 'yes'.",
    "Let's try again, Ada!",
  ]);
  expect(output).not.toHaveBeenCalledWith("Congratulations, Ada!");
});

test.each(["YES", " yes", "yes ", ""])("rejects a non-exact answer %j", (answer) => {
  input.mockReturnValueOnce("Ada").mockReturnValueOnce(answer);
  const getGameData = jest.fn(() => ({ question: 2, correctAnswer: "yes" }));
  runGame("Is it even?", getGameData);
  expect(getGameData).toHaveBeenCalledTimes(1);
  expect(output).toHaveBeenCalledWith(`'${answer}' is wrong answer ;(. Correct answer was 'yes'.`);
});
