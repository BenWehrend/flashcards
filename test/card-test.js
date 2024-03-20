const chai = require('chai');
const expect = chai.expect;

const { createCard, evaluateGuess, createDeck, countDeck } = require('../src/card');

describe('card', function() {
  it('should be a function', function() {
    expect(createCard).to.be.a('function');
  });

  it('should create a card and its properties', function() {
    const card = createCard(1, 'What is the capital of France?', ['Paris', 'array', 'function'], 'Paris');
    
    expect(card.id).to.equal(1);
    expect(card.question).to.equal('What is the capital of France?');
    expect(card.answers).to.deep.equal(['Paris', 'array', 'function']);
    expect(card.correctAnswer).to.equal('Paris');
  });  
});

describe('evaluateGuess', function() {
  it('should return "Correct!" for right answers', function() {
    const card = createCard(1, 'Which gas is most abundant in the Earth\'s atmosphere?', ['Oxygen', 'Nitrogen', 'Carbon Dioxide'], 'Nitrogen');
    const guess = 'Nitrogen';
    const result = evaluateGuess(guess, card);

    expect(result).to.be.equal('Correct!');
  });

  it('should return "Incorrect!" for wrong answers', function() {
    const card = createCard(2, 'What is the largest planet in our Solar System?', ['Earth', 'Jupiter', 'Saturn'], 'Jupiter');
    const guess = 'Saturn';
    const result = evaluateGuess(guess, card);

   expect(result).to.be.equal('Incorrect!');
  });
});

describe('createDeck', function() {
  const card1 = createCard(1, 'Who wrote Hamlet?', ['Charles Dickens', 'William Shakespeare', 'Leo Tolstoy'], 'William Shakespeare');
  const card2 = createCard(2, 'What is the chemical symbol for gold?', ['Au', 'Ag', 'Pt'], 'Au'); 
  const card3 = createCard(3, 'How many continents are there?', ['5', '6', '7'], '7');

  it('should create a deck of cards', function() {
    const deck = createDeck([card1, card2, card3])
    
    expect(deck).to.be.an('array');;
  });
});

describe('countDeck', function() {
  const card1 = createCard(1, 'What is the smallest prime number?', ['1', '2', '3'], '2');
  const card2 = createCard(2, 'Which of these animals is not a mammal?', ['Whale', 'Shark', 'Bat'], 'Shark'); 
  const card3 = createCard(3, 'What is the longest river in the world?', ['Nile', 'Amazon', 'Yangtze'], 'Amazon');
  
  it('should know how many cards are in the deck', function() {
    const count = countDeck([card1, card2, card3]);
    expect(count).to.have.equal(3);
  });
});