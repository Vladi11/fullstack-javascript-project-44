import readlineSync from "readline-sync";

const isEven = (num) => num % 2 === 0;

const getRandomNumber = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const getGameData = () => {
  const question = getRandomNumber(1, 100);
  const correctAnswer = isEven(question) ? "yes" : "no";

  return { question, correctAnswer };
};

export default () => {
  console.log("Welcome to the Brain Games!");

  const userName = readlineSync.question("May I have your name? ");

  console.log(`Hello, ${userName}!`);
  console.log('Answer "yes" if the number is even, otherwise answer "no".');

  const roundsCount = 3;

  for (let i = 0; i < roundsCount; i += 1) {
    const { question, correctAnswer } = getGameData();

    console.log(`Question: ${question}`);

    const userAnswer = readlineSync.question("Your answer: ");

    if (userAnswer !== correctAnswer) {
      console.log(`'${userAnswer}' is wrong answer ;(. Correct answer was '${correctAnswer}'.`);
      console.log(`Let's try again, ${userName}!`);
      return;
    }

    console.log("Correct!");
  }

  console.log(`Congratulations, ${userName}!`);
};
