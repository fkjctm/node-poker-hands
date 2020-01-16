const getFlushRank = require('./get-flush-rank');
const cards = require('./cards');

describe('getFlushRank', () => {
  const kingOfHearts = cards.find(c => c.key === 'Kh');
  const queenOfHearts = cards.find(c => c.key === 'Qh');
  const nineOfHearts = cards.find(c => c.key === '9h');
  const sevenOfHearts = cards.find(c => c.key === '7h');

  test('for a non-flush hand, expect null', () => {
    const nineOfClubs = cards.find(c => c.key === '9c');
    const hand = {
      cards: [kingOfHearts, queenOfHearts, nineOfClubs, nineOfHearts, sevenOfHearts],
      rankArray: [0, 0, 0, 0, 0, 1, 0, 2, 0, 0, 1, 1, 0],
      suitArray: [0, 4, 1, 0]
    };
    expect(getFlushRank(hand)).toBeNull();
  });

  test('for a flush hand, expect high rank returned', () => {
    const sixOfHearts = cards.find(c => c.key === '6h');
    const hand = {
      cards: [kingOfHearts, queenOfHearts, nineOfHearts, sevenOfHearts, sixOfHearts],
      rankArray: [0, 0, 0, 0, 1, 1, 0, 1, 0, 0, 1, 1, 0],
      suitArray: [0, 5, 0, 0]
    };
    expect(getFlushRank(hand)).toBe('King');
  });
});
