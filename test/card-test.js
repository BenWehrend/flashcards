var chai = require('chai');
var expect = chai.expect;

var { createCard, evaluateGuess, createDeck, countDeck, createRound, takeTurn, calculatePercentCorrect, endRound } = require('../src/card');

describe('createCard', function() {
  it('should be a function', function() {
    expect(createCard).to.be.a('function');
  });

  it('should create a card and its properties', function() {
    var card = createCard(1, 'What is the capital of France?', ['Paris', 'London', 'Rome'], 'Paris');
    
    expect(card.id).to.equal(1);
    expect(card.question).to.equal('What is the capital of France?');
    expect(card.answers).to.deep.equal(['Paris', 'London', 'Rome']);
    expect(card.correctAnswer).to.equal('Paris');
  });  
});

describe('evaluateGuess', function() {
  it('should return "Correct!" for right answers', function() {
    var card = createCard(1, 'Which gas is most abundant in the Earth\'s atmosphere?', ['Oxygen', 'Nitrogen', 'Carbon Dioxide'], 'Nitrogen');
    var guess = 'Nitrogen';
    var result = evaluateGuess(guess, card);

    expect(result).to.be.equal('Correct!');
  });

  it('should return "Incorrect!" for wrong answers', function() {
    var card = createCard(2, 'What is the largest planet in our Solar System?', ['Earth', 'Jupiter', 'Saturn'], 'Jupiter');
    var guess = 'Saturn';
    var result = evaluateGuess(guess, card);

   expect(result).to.be.equal('Incorrect!');
  });
});

describe('createDeck', function() {
  var card1 = createCard(1, 'Who wrote Hamlet?', ['Charles Dickens', 'William Shakespeare', 'Leo Tolstoy'], 'William Shakespeare');
  var card2 = createCard(2, 'What is the chemical symbol for gold?', ['Au', 'Ag', 'Pt'], 'Au'); 
  var card3 = createCard(3, 'How many continents are there?', ['5', '6', '7'], '7');

  it('should create a deck of cards', function() {
    var deck = createDeck([card1, card2, card3])
    
    expect(deck).to.be.an('array');;
  });
});

describe('countDeck', function() {
  var card1 = createCard(1, 'What is the smallest prime number?', ['1', '2', '3'], '2');
  var card2 = createCard(2, 'Which of these animals is not a mammal?', ['Whale', 'Shark', 'Bat'], 'Shark'); 
  var card3 = createCard(3, 'What is the longest river in the world?', ['Nile', 'Amazon', 'Yangtze'], 'Amazon');
  
  it('should know how many cards are in the deck', function() {
    var count = countDeck([card1, card2, card3]);
    expect(count).to.have.equal(3);
  });
});

describe('createRound', function() {
  var card1 = createCard(1, 'Who painted the Mona Lisa?', ['Vincent Van Gogh', 'Pablo Picasso', 'Leonardo da Vinci'], 'Leonardo da Vinci');
  var card2 = createCard(2, 'Who composed the Four Seasons?', ['Ludwig van Beethoven', 'Antonio Vivaldi', 'Johann Sebastian Bach'], 'Antonio Vivaldi'); 
  var card3 = createCard(3, 'What is the main ingredient in guacamole?', ['Tomato', 'Avocado', 'Pepper'], 'Avocado');
  

  it('should have a deck of cards', function() {
    var deck = [card1]
    var round = createRound(deck);

    expect(round).to.exist;
    expect(round.deck).to.be.an('array');
    expect(round.currentCard).to.deep.equal(card1);
    expect(round.turns).to.equal(0);
    expect(round.incorrectGuesses).to.deep.equal([]);
  });

  it('should have a current card', function() {
    var deck = [card1, card2, card3]
    var round = createRound(deck);

    expect(round.currentCard).to.deep.equal(card1);
  });

  it('should start at turn 0', function() {
    var deck = [card1]
    var round = createRound(deck);

    expect(round.turns).to.equal(0);
  });

  it('should start with no incorrect guesses', function() {
    var deck = [card1]
    var round = createRound(deck);

    expect(round.incorrectGuesses).to.deep.equal([]);
  });
});

describe('takeTurn', function() {
  var card1 = createCard(1, 'What is the hardest natural substance on Earth?', ['Gold', 'Diamond', 'Quartz'], 'Diamond');
  var card2 = createCard(2, 'What is the currency of Japan?', ['Yuan', 'Won', 'Yen'], 'Yen');

  it('should update turn count when guess is made', function() {
    var round = createRound([card1]);
    var firstTurn = round.turns;

    takeTurn('Diamond', round);

    expect(round.turns).to.equal(firstTurn + 1);

  });

  it('should update next card in deck to the current card', function() {
    var round = createRound([card1, card2]);
    var currentCardIndex = round.deck.indexOf(round.currentCard);
    var nextCard = round.deck[currentCardIndex + 1];

    takeTurn('Yen', round);
      
    expect(round.currentCard).to.equal(nextCard);
  });

  it('should return "Correct!" if answer is right', function() {
    var round = createRound([card1]);
    var response = takeTurn('Diamond', round);

    expect(response).to.equal("Correct!");
  });

  it('should return "Incorrect!" if answer is wrong', function() {
    var round = createRound([card2]);
    var response = takeTurn('Yuan', round);

    expect(response).to.equal("Incorrect!");
  });

  it('should keep track of incorrect guesses', function() {
    var round = createRound([card2])

    takeTurn('Yuan', round);

    expect(round.incorrectGuesses[0]).to.equal(2);
  });
});

describe('calculatePercentCorrect', function() {
  var card1 = createCard(1, 'What is the largest ocean on Earth?', ['Atlantic', 'Indian', 'Pacific'], 'Pacific');
  var card2 = createCard(2, 'Who discovered penicillin?', ['Marie Curie', 'Alexander Fleming', 'Isaac Newton'], 'Alexander Fleming');
  var card3 = createCard(3, 'What is the boiling point of water at sea level?', ['100°C', '90°C', '110°C'], '100°C');

  it('should keep track of players correct guess percentage', function() {
    var round1 = createRound([card1]);
    takeTurn('Pacific', round1);

    var round2 = createRound([card2]);
    takeTurn('Alexander Fleming', round2);

    var round3 = createRound([card3]);
    takeTurn('100°C', round3);
    var percentCorrect = calculatePercentCorrect([round1, round2, round3]);

    expect(percentCorrect).to.equal(100);
  });
});

describe('endRound', function() {
  var card1 = createCard(1, 'What is the boiling point of water at sea level?', ['100°C', '90°C', '110°C'], '100°C');
  var card2 = createCard(2, 'In which country is the Great Barrier Reef located?', ['Australia', 'Brazil', 'South Africa'], 'Australia');

  it('should return a message after each round', function() {
    var round1 = createRound([card1]);
    takeTurn('100°C', round1);

    var round2 = createRound([card2]);
    takeTurn('South Africa', round2);

    var endRoundMsg = endRound([round1, round2]);
    expect(endRoundMsg).to.be.equal('** Round over! ** You answered 50% of the questions correctly!')  
  });
});