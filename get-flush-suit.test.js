const cards = require('./cards');
const getFlushSuit = require('./get-flush-suit');

describe('getFlushSuit', () => {
  const eightOfDiamonds = cards.filter(c => c.key === '8d')[0];
  const nineOfDiamonds = cards.filter(c => c.key === '9d')[0];
  const tenOfDiamonds = cards.filter(c => c.key === 'Td')[0];
  const jackOfDiamonds = cards.filter(c => c.key === 'Jd')[0];

  test('for a non-flush hand, expect null', () => {
    const fourOfClubs = cards.filter(c => c.key === '4c')[0];

    const handObj = { cards: [eightOfDiamonds, nineOfDiamonds, tenOfDiamonds, jackOfDiamonds, fourOfClubs]};
    expect(getFlushSuit(handObj)).toBeNull();
  });

  test('for a flush hand, expect suit returned', () => {
    const queenOfDiamonds = cards.filter(c => c.key === 'Qd')[0];

    const handObj = { cards: [eightOfDiamonds, nineOfDiamonds, tenOfDiamonds, jackOfDiamonds, queenOfDiamonds]};
    expect(getFlushSuit(handObj)).toBe('Diamonds');
  });
});
