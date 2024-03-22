const createCard = (id, question, answers, correctAnswer) => {
    return {
        id: id,
        question: question,
        answers: answers,
        correctAnswer: correctAnswer
    };
};

const evaluateGuess = (guess, card) => {
    if (guess === card.correctAnswer) {
        return 'Correct!'
    } else {
        return "Incorrect!"
    };
};

const createDeck = (...cards) => {
    return cards;
};

const countDeck = (cards) => {
    return cards.length;
};

function createRound(deck) {
    return {
      deck,
      currentCard: deck[0],
      turns: 0,
      incorrectGuesses: [],
      getNextCard: function() {
        if (this.deck.length > this.turns) {
            // console.log('dl', this.deck.length)
            // console.log('turns', this.turns)
            // console.log('dt', this.deck[this.turns])
          return this.deck[this.turns];
        };
        return 'Game Over!';
      }
    };
};

function takeTurn(guess, round) {
    round.turns++;
  
    let currentCard = round.currentCard;
    let response;
  
    if (guess === currentCard.correctAnswer) {
      response = "Correct!";
    } else {
      round.incorrectGuesses.push(currentCard.id);
      response = "Incorrect!";
    };
    round.currentCard = round.getNextCard();
    return response;
};


const calculatePercentCorrect = (rounds) => {
    let totalRounds = rounds.length;
    let totalCorrect = 0;

    rounds.forEach((round) => {
        if (round.incorrectGuesses.length === 0) {
            totalCorrect++;
        };
    });
    return (totalCorrect / totalRounds) * 100;
};

const endRound = (rounds) => {
    let totalCorrect = 0;
    rounds.forEach((round) => {
        if (round.incorrectGuesses.length === 0) {
            totalCorrect++;
        };
    });
    let percentCorrect = (totalCorrect / rounds.length) * 100;
    return `** Round over! ** You answered ${Math.round(percentCorrect)}% of the questions correctly!`;
};

module.exports = {
    createCard,
    evaluateGuess,
    createDeck,
    countDeck,
    createRound,
    takeTurn,
    calculatePercentCorrect,
    endRound
};