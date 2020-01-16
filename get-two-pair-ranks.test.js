const getTwoPairRanks = require('./get-two-pair-ranks');
const cards = require('./cards');

describe('getTwoPairRanks', () => {
  const aceOfSpades = cards.find(c => c.key === 'As');
  const aceOfClubs = cards.find(c => c.key === 'Ac');
  const jackOfHearts = cards.find(c => c.key === 'Jh');
  const eightOfSpades = cards.find(c => c.key === '8s');

  test('for a non-two-pair hand, expect null', () => {
    const fiveOfDiamonds = cards.find(c => c.key === '5d');
    const hand = {
      cards: [aceOfSpades, aceOfClubs, jackOfHearts, eightOfSpades, fiveOfDiamonds],
      rankArray: [0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 2],
      suitArray: [2, 1, 1, 1]
    };
    expect(getTwoPairRanks(hand)).toBeNull();
  });

  test('for a two-pair hand, expect correct ranks returned', () => {
    const jackOfDiamonds = cards.find(c => c.key === 'Jd');
    const hand = {
      cards: [aceOfSpades, aceOfClubs, jackOfHearts, jackOfDiamonds, eightOfSpades],
      rankArray: [0, 0, 0, 0, 0, 0, 1, 0, 0, 2, 0, 0, 2],
      suitArray: [2, 1, 1, 1]
    };
    expect(getTwoPairRanks(hand)).toBe('Aces and Jacks');
  });
});
