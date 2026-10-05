import runGame from "../index.js";
import { getRandomNumber } from "../utils.js";

const description = "What is the result of the expression?";

const calculate = (x, y, operator) => {
  switch (operator) {
    case "+":
      return x + y;
    case "-":
      return x - y;
    case "*":
      return x * y;
    default:
      throw new Error(`Unknown operator: '${operator}'!`);
  }
};

const getGameData = () => {
  const operators = ["+", "-", "*"];
  const operator = operators[getRandomNumber(0, operators.length - 1)];
  const num1 = getRandomNumber(1, 10);
  const num2 = getRandomNumber(1, 10);
  const question = `${num1} ${operator} ${num2}`;
  const correctAnswer = String(calculate(num1, num2, operator));

  return { question, correctAnswer };
};

export default () => runGame(description, getGameData);
