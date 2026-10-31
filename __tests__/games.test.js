import { beforeEach, expect, jest, test } from "@jest/globals";

const runGame = jest.fn();
const getRandomNumber = jest.fn();
jest.unstable_mockModule("../src/index.js", () => ({ default: runGame }));
jest.unstable_mockModule("../src/utils.js", () => ({ getRandomNumber }));

const { default: even } = await import("../src/games/even.js");
const { default: calc } = await import("../src/games/calc.js");
const { default: gcd } = await import("../src/games/gcd.js");
const { default: prime } = await import("../src/games/prime.js");
const { default: progression } = await import("../src/games/progression.js");

beforeEach(() => getRandomNumber.mockReset());

const generate = (game, description, numbers) => {
  numbers.forEach((number) => getRandomNumber.mockReturnValueOnce(number));
  game();
  expect(runGame).toHaveBeenCalledTimes(1);
  expect(runGame).toHaveBeenCalledWith(description, expect.any(Function));
  return runGame.mock.calls[0][1]();
};

test.each([
  [1, "no"],
  [2, "yes"],
  [99, "no"],
  [100, "yes"],
])("even: %i → %s", (number, answer) => {
  expect(
    generate(even, 'Answer "yes" if the number is even, otherwise answer "no".', [number]),
  ).toEqual({ question: number, correctAnswer: answer });
  expect(getRandomNumber.mock.calls).toEqual([[1, 100]]);
});

test.each([
  [0, 1, 10, "1 + 10", "11"],
  [1, 1, 10, "1 - 10", "-9"],
  [1, 5, 5, "5 - 5", "0"],
  [2, 10, 10, "10 * 10", "100"],
])("calc: operator %i with %i and %i", (operator, a, b, question, correctAnswer) => {
  expect(generate(calc, "What is the result of the expression?", [operator, a, b])).toEqual({
    question,
    correctAnswer,
  });
  expect(getRandomNumber.mock.calls).toEqual([
    [0, 2],
    [1, 10],
    [1, 10],
  ]);
});

test.each([
  [25, 50, "25"],
  [50, 25, "25"],
  [17, 19, "1"],
  [100, 100, "100"],
  [1, 100, "1"],
  [48, 18, "6"],
])("gcd: %i and %i → %s", (a, b, correctAnswer) => {
  expect(generate(gcd, "Find the greatest common divisor of given numbers.", [a, b])).toEqual({
    question: `${a} ${b}`,
    correctAnswer,
  });
  expect(getRandomNumber.mock.calls).toEqual([
    [1, 100],
    [1, 100],
  ]);
});

test.each([
  [1, "no"],
  [2, "yes"],
  [3, "yes"],
  [4, "no"],
  [9, "no"],
  [25, "no"],
  [49, "no"],
  [97, "yes"],
  [100, "no"],
])("prime: %i → %s", (number, correctAnswer) => {
  expect(
    generate(prime, 'Answer "yes" if given number is prime. Otherwise answer "no".', [number]),
  ).toEqual({ question: number, correctAnswer });
  expect(getRandomNumber.mock.calls).toEqual([[1, 100]]);
});

test.each([
  [5, 1, 2, 0, ".. 3 5 7 9", "1"],
  [5, 1, 2, 2, "1 3 .. 7 9", "5"],
  [10, 50, 10, 9, "50 60 70 80 90 100 110 120 130 ..", "140"],
])(
  "progression: length %i, start %i, step %i, hidden %i",
  (length, start, step, hidden, question, correctAnswer) => {
    expect(
      generate(progression, "What number is missing in the progression?", [
        length,
        start,
        step,
        hidden,
      ]),
    ).toEqual({ question, correctAnswer });
    expect(getRandomNumber.mock.calls).toEqual([
      [5, 10],
      [1, 50],
      [2, 10],
      [0, length - 1],
    ]);
  },
);
