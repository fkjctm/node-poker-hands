const cards = require('./cards');
const getStraightHighCard = require('./get-straight-high-card');

describe('getStraightHighCard', () => {
  const jackOfDiamonds = cards.filter(c => c.key === 'Jd')[0];
  const tenOfClubs = cards.filter(c => c.key === 'Tc')[0];
  const nineOfHearts = cards.filter(c => c.key === '9h')[0];
  const eightOfSpades = cards.filter(c => c.key === '8s')[0];

  test('for a non-straight hand, expect null return', () => {
    const sixOfSpades = cards.filter(c => c.key === '6s')[0];
    const hand = {
      cards: [jackOfDiamonds, tenOfClubs, nineOfHearts, eightOfSpades, sixOfSpades],
      rankArray: [0, 0, 0, 0, 1, 0, 1, 1, 1, 1, 0, 0, 0],
      suitArray: [2, 1, 1, 1]
    };

    expect(getStraightHighCard(hand)).toBeNull();
  });

  test('for an Ace to Five straight, expect `Five` returned', () => {
    const aceOfHearts = cards.filter(c => c.key === 'Ah')[0];
    const deuceOfClubs = cards.filter(c => c.key === '2c')[0];
    const treOfDiamonds = cards.filter(c => c.key === '3d')[0];
    const fourOfClubs = cards.filter(c => c.key === '4c')[0];
    const fiveOfSpades = cards.filter(c => c.key === '5s')[0];
    const hand = {
      cards: [treOfDiamonds, fiveOfSpades, fourOfClubs, deuceOfClubs, aceOfHearts],
      rankArray: [1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      suitArray: [1, 1, 2, 1]
    };

    expect(getStraightHighCard(hand)).toBe('Five');
  });

  test('for a straight hand, expect high rank returned', () => {
    const sevenOfSpades = cards.filter(c => c.key === '7s')[0];
    const hand = {
      cards: [jackOfDiamonds, tenOfClubs, nineOfHearts, eightOfSpades, sevenOfSpades],
      rankArray: [0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0],
      suitArray: [2, 1, 1, 1]
    };

    expect(getStraightHighCard(hand)).toBe('Jack');
  });
});
