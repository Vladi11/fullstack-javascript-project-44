import readlineSync from "readline-sync";

const roundsCount = 3;

export default (description, getGameData) => {
  console.log("Welcome to the Brain Games!");

  const userName = readlineSync.question("May I have your name? ");

  console.log(`Hello, ${userName}!`);
  console.log(description);

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
