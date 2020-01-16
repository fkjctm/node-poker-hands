const cards = require('./cards');
const getFlushSuit = require('./get-flush-suit');

describe('getFlushSuit', () => {
  const eightOfDiamonds = cards.find(c => c.key === '8d');
  const nineOfDiamonds = cards.find(c => c.key === '9d');
  const tenOfDiamonds = cards.find(c => c.key === 'Td');
  const jackOfDiamonds = cards.find(c => c.key === 'Jd');

  test('for a non-flush hand, expect null', () => {
    const fourOfClubs = cards.find(c => c.key === '4c');

    const handObj = {
      cards: [eightOfDiamonds, nineOfDiamonds, tenOfDiamonds, jackOfDiamonds, fourOfClubs],
      suitArray: [0, 0, 1, 4],
      rankArray: [0, 0, 1, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0]
    };
    expect(getFlushSuit(handObj)).toBeNull();
  });

  test('for a flush hand, expect suit returned', () => {
    const queenOfDiamonds = cards.find(c => c.key === 'Qd');

    const handObj = {
      cards: [eightOfDiamonds, nineOfDiamonds, tenOfDiamonds, jackOfDiamonds, queenOfDiamonds],
      suitArray: [0, 0, 0, 5],
      rankArray: [0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0]
    };
    expect(getFlushSuit(handObj)).toBe('Diamonds');
  });
});
