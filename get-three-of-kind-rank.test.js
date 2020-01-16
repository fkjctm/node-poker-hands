const getThreeOfKindRank = require('./get-three-of-kind-rank');
const cards = require('./cards');

describe('getThreeOfKindRank', () => {
  const tenOfClubs = cards.find(c => c.key === 'Tc');
  const tenOfSpades = cards.find(c => c.key === 'Ts');
  const eightOfHearts = cards.find(c => c.key === '8h');
  const sixOfClubs = cards.find(c => c.key === '6c');

  test('for non-three-of-kind hands, expect null', () => {
    const fiveOfSpades = cards.find(c => c.key === '5s');
    const hand = {
      cards: [tenOfClubs, tenOfSpades, eightOfHearts, sixOfClubs, fiveOfSpades],
      rankArray: [0, 0, 0, 1, 1, 0, 1, 0, 2, 0, 0, 0, 0],
      suitArray: [2, 1, 2, 0]
    };
    expect(getThreeOfKindRank(hand)).toBeNull();
  });

  test('for three-of-kind hands, expect null', () => {
    const tenOfDiamonds = cards.find(c => c.key === 'Td');
    const hand = {
      cards: [tenOfClubs, tenOfSpades, tenOfDiamonds, eightOfHearts, sixOfClubs],
      rankArray: [0, 0, 0, 0, 1, 0, 1, 0, 3, 0, 0, 0, 0],
      suitArray: [1, 1, 2, 1]
    };
    expect(getThreeOfKindRank(hand)).toBe('Tens');
  });
});
