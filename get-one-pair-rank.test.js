const cards = require('./cards');
const getOnePairRank = require('./get-one-pair-rank');

describe('getOnePairRank', () => {
  const eightOfHearts = cards.find(c => c.key === '8h');
  const sevenOfClubs = cards.find(c => c.key === '7c');
  const fiveOfSpades = cards.find(c => c.key === '5s');
  const fourOfHearts = cards.find(c => c.key === '4h');

  it('for non-one-pair hand, expect null', () => {
    const threeOfSpades = cards.find(c => c.key === '3s');
    const hand = {
      cards: [eightOfHearts, sevenOfClubs, fiveOfSpades, fourOfHearts, threeOfSpades],
      rankArray: [0, 1, 1, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0],
      suitArray: [2, 2, 1, 0]
    };
    expect(getOnePairRank(hand)).toBeNull();
  });

  it('for one-pair hand, expect null', () => {
    const fourOfDiamonds = cards.find(c => c.key === '4d');
    const hand = {
      cards: [eightOfHearts, sevenOfClubs, fiveOfSpades, fourOfHearts, fourOfDiamonds],
      rankArray: [0, 0, 2, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0],
      suitArray: [1, 2, 1, 1]
    };
    expect(getOnePairRank(hand)).toBe('Fours');
  });
});
