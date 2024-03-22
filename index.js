const inquirer = require('inquirer');
const { createCard, createDeck, createRound } = require('./src/card');
const { prototypeData } = require('./src/data');

// creates cards from your prototype data
let cards = prototypeData.map(card => createCard(card.id, card.question, card.choices, card.answer));

// creates a deck and a round with your cards
let deck = createDeck(...cards);
let round = createRound(deck);

// function to ask a question using inquirer
const askQuestion = (card) => {
  return inquirer.prompt([
    {
      type: 'list',
      name: 'userAnswer',
      message: card.question,
      choices: card.answers
    }
  ]);
}

// function to run the game
async function start(round) {
    let correctAnswers = 0;

    for (let i = 0; i < round.deck.length; i++) {
      let card = round.deck[i];
      let { userAnswer } = await askQuestion(card);
  
      if (userAnswer === card.correctAnswer) {
        console.log("Correct!");
        correctAnswers++;
      } else {
        console.log("Incorrect!");
      }
    }

    let score = (correctAnswers / round.deck.length) * 100;
  
    console.log(`Game over! Your score is ${score.toFixed(2)}% correct. Enter "node index.js" to play again.`);
  }

start(round);