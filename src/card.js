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

const createRound = (deck) => {
    return {
        deck: deck,
        currentCard: deck[0],
        turns: 0,
        incorrectGuesses: []
    };
};

const takeTurn = (guess, round) => {
    let result = evaluateGuess(guess, round.currentCard);
    if (result === "Incorrect!") {
        round.incorrectGuesses.push(round.currentCard.id)
    };
    round.turns++;
    round.currentCard = round.deck[round.turns];
    return result;
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
        }
    })
    let percentCorrect = (totalCorrect / rounds.length) * 100;
    return `** Round over! ** You answered ${Math.round(percentCorrect)}% of the questions correctly!`;
}

module.exports = {
    createCard,
    evaluateGuess,
    createDeck,
    countDeck,
    createRound,
    takeTurn,
    calculatePercentCorrect,
    endRound
}