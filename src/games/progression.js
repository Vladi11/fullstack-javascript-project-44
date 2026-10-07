import runGame from "../index.js";
import { getRandomNumber } from "../utils.js";

const description = "What number is missing in the progression?";

const generateProgression = (start, step, length) => {
  const progression = [];

  for (let i = 0; i < length; i += 1) {
    progression.push(start + i * step);
  }

  return progression;
};

const getGameData = () => {
  const length = getRandomNumber(5, 10);
  const start = getRandomNumber(1, 50);
  const step = getRandomNumber(2, 10);

  const progression = generateProgression(start, step, length);
  const hiddenIndex = getRandomNumber(0, length - 1);
  const correctAnswer = String(progression[hiddenIndex]);

  progression[hiddenIndex] = "..";

  const question = progression.join(" ");

  return { question, correctAnswer };
};

export default () => runGame(description, getGameData);
