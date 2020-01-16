const cards = require('./cards');
const getStraightHighCard = require('./get-straight-high-card');

describe('getStraightHighCard', () => {
  const jackOfDiamonds = cards.find(c => c.key === 'Jd');
  const tenOfClubs = cards.find(c => c.key === 'Tc');
  const nineOfHearts = cards.find(c => c.key === '9h');
  const eightOfSpades = cards.find(c => c.key === '8s');

  test('for a non-straight hand, expect null return', () => {
    const sixOfSpades = cards.find(c => c.key === '6s');
    const hand = {
      cards: [jackOfDiamonds, tenOfClubs, nineOfHearts, eightOfSpades, sixOfSpades],
      rankArray: [0, 0, 0, 0, 1, 0, 1, 1, 1, 1, 0, 0, 0],
      suitArray: [2, 1, 1, 1]
    };

    expect(getStraightHighCard(hand)).toBeNull();
  });

  test('for an Ace to Five straight, expect `Five` returned', () => {
    const aceOfHearts = cards.find(c => c.key === 'Ah');
    const deuceOfClubs = cards.find(c => c.key === '2c');
    const treOfDiamonds = cards.find(c => c.key === '3d');
    const fourOfClubs = cards.find(c => c.key === '4c');
    const fiveOfSpades = cards.find(c => c.key === '5s');
    const hand = {
      cards: [treOfDiamonds, fiveOfSpades, fourOfClubs, deuceOfClubs, aceOfHearts],
      rankArray: [1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      suitArray: [1, 1, 2, 1]
    };

    expect(getStraightHighCard(hand)).toBe('Five');
  });

  test('for a straight hand, expect high rank returned', () => {
    const sevenOfSpades = cards.find(c => c.key === '7s');
    const hand = {
      cards: [jackOfDiamonds, tenOfClubs, nineOfHearts, eightOfSpades, sevenOfSpades],
      rankArray: [0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0],
      suitArray: [2, 1, 1, 1]
    };

    expect(getStraightHighCard(hand)).toBe('Jack');
  });
});
