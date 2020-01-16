const cards = require('./cards');
const getFullHouseRanks = require('./get-full-house-ranks');

describe('getFullHouseRanks', () => {
  const threeOfClubs = cards.find(c => c.key === '3c');
  const threeOfSpades = cards.find(c => c.key === '3s');
  const eightOfClubs = cards.find(c => c.key === '8c');
  const eightOfSpades = cards.find(c => c.key === '8s');

  test('for non-full-house hands, expect null', () => {
    const jackOfDiamonds = cards.find(c => c.key === 'Jd');
    const hand = {
      cards: [jackOfDiamonds, eightOfSpades, eightOfClubs, threeOfClubs, threeOfSpades],
      rankArray: [0, 2, 0, 0, 0, 0, 2, 0, 0, 1, 0, 0, 0],
      suitArray: [2, 0, 2, 1]
    };
    expect(getFullHouseRanks(hand)).toBeNull();
  });

  test('for full-house hands, expect ranks returned', () => {
    const eightOfHearts = cards.find(c => c.key === '8h');
    const hand = {
      cards: [eightOfHearts, eightOfSpades, eightOfClubs, threeOfClubs, threeOfSpades],
      rankArray: [0, 2, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0],
      suitArray: [2, 1, 2, 0]
    };
    expect(getFullHouseRanks(hand)).toBe('Eights over Tres');
  });
});
