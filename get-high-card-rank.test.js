const getHighCardRank = require('./get-high-card-rank');
const cards = require('./cards');

describe('getHighCardRank', () => {
  const kingOfClubs = cards.find(c => c.key === 'Kc');
  const queenOfSpades = cards.find(c => c.key === 'Qs');
  const nineOfHearts = cards.find(c => c.key === '9h');
  const sevenOfClubs = cards.find(c => c.key === '7c');

  it('for non-high-card hands, expect error thrown', () => {
    const sevenOfHearts = cards.find(c => c.key === '7h');
    const hand = {
      cards: [kingOfClubs, queenOfSpades, nineOfHearts, sevenOfClubs, sevenOfHearts],
      rankArray: [0, 0, 0, 0, 0, 2, 0, 1, 0, 0, 1, 1, 0],
      suitArray: [1, 2, 2, 0]
    };
    expect(() => getHighCardRank(hand)).toThrow('Could not parse hand');
  });

  it('for high-card hands, expect high card rank returned', () => {
    const sixOfDiamonds = cards.find(c => c.key === '6d');
    const hand = {
      cards: [kingOfClubs, queenOfSpades, nineOfHearts, sevenOfClubs, sixOfDiamonds],
      rankArray: [0, 0, 0, 0, 1, 1, 0, 1, 0, 0, 1, 1, 0],
      suitArray: [1, 1, 2, 1]
    };
    expect(getHighCardRank(hand)).toBe('King');
  });
});
