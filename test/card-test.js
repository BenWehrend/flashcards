const chai = require('chai');
const expect = chai.expect;

const { createCard, evaluateGuess } = require('../src/card');

describe('card', function() {
  it.skip('should be a function', function() {
    expect(createCard).to.be.a('function');
  });

  it('should create a card and its properties', function() {
    const card = createCard(1, 'What allows you to define a set of related information using key-value pairs?', ['object', 'array', 'function'], 'object');
    
    expect(card.id).to.equal(1);
    expect(card.question).to.equal('What allows you to define a set of related information using key-value pairs?');
    expect(card.answers).to.deep.equal(['object', 'array', 'function']);
    expect(card.correctAnswer).to.equal('object');
  });  
});

describe('evaluateGuess', function() {
  it.skip('should return "Correct!" for right answers', function() {
    const card = createCard(1, 'What allows you to define a set of related information using key-value pairs?', ['object', 'array', 'function'], 'object');
    const guess = 'object';
    const result = evaluateGuess(guess, card);

    expect(result).to.be.equal('Correct!');
  });

  it.skip('should return "Incorrect!" for wrong answers', function() {
    const card = createCard(2, 'What is a comma-separated list of related values?', ['array', 'object', 'function'], 'array');
    const guess = 'function';
    const result = evaluateGuess(guess, card);

   expect(result).to.be.equal('Incorrect!');
  });
});

describe('createDeck', function() {
  it.skip('should create a deck of cards', function() {
    const deck = createDeck([card1, card2, card3])
  })

  it.skip('should know how many cards are in the deck', function() {

  })
})