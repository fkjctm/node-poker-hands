const cards = require('./cards');
const getFullHouseRanks = require('./get-full-house-ranks');

describe('getFullHouseRanks', () => {
  const threeOfClubs = cards.filter(c => c.key === '3c')[0];
  const threeOfSpades = cards.filter(c => c.key === '3s')[0];
  const eightOfClubs = cards.filter(c => c.key === '8c')[0];
  const eightOfSpades = cards.filter(c => c.key === '8s')[0];

  test('for non-full-house hands, expect null', () => {
    const jackOfDiamonds = cards.filter(c => c.key === 'Jd')[0];
    const hand = {
      cards: [jackOfDiamonds, eightOfSpades, eightOfClubs, threeOfClubs, threeOfSpades],
      rankArray: [0, 2, 0, 0, 0, 0, 2, 0, 0, 1, 0, 0, 0],
      suitArray: [2, 0, 2, 1]
    };
    expect(getFullHouseRanks(hand)).toBeNull();
  });

  test('for full-house hands, expect ranks returned', () => {
    const eightOfHearts = cards.filter(c => c.key === '8h')[0];
    const hand = {
      cards: [eightOfHearts, eightOfSpades, eightOfClubs, threeOfClubs, threeOfSpades],
      rankArray: [0, 2, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0],
      suitArray: [2, 1, 2, 0]
    };
    expect(getFullHouseRanks(hand)).toBe('Eights over Tres');
  });
});
