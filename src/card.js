const createCard = (id, question, answers, correctAnswer) => {
    return {
        id: id,
        question: question,
        answers: answers,
        correctAnswer: correctAnswer
    }
}

const evaluateGuess = (guess, card) => {
    if (guess === card.correctAnswer) {
        return 'Correct!'
    } else {
        return "Incorrect!"
    }
}

const createDeck = (...cards) => {
    return cards
}

const countDeck = (cards) => {
    return cards.length
}

module.exports = {
    createCard,
    evaluateGuess,
    createDeck,
    countDeck
}