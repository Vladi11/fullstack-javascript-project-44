import runGame from "../index.js";
import { getRandomNumber } from "../utils.js";

const description = "Find the greatest common divisor of given numbers.";

const getGcd = (a, b) => {
  if (b === 0) {
    return a;
  }
  return getGcd(b, a % b);
};

const getGameData = () => {
  const num1 = getRandomNumber(1, 100);
  const num2 = getRandomNumber(1, 100);

  const question = `${num1} ${num2}`;
  const correctAnswer = String(getGcd(num1, num2));

  return { question, correctAnswer };
};

export default () => runGame(description, getGameData);
