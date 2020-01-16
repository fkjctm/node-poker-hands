const getFourOfKindRank = require('./get-four-of-kind-rank');
const cards = require('./cards');

describe('getFourOfKindRank', () => {
  const sevenOfDiamonds = cards.find(c => c.key === '7d');
  const sevenOfClubs = cards.find(c => c.key === '7c');
  const sevenOfSpades = cards.find(c => c.key === '7s');
  const aceOfHearts = cards.find(c => c.key === 'Ah');

  it('for a non-four-of-kind hand, expect null', () => {
    const fourOfClubs = cards.find(c => c.key === '4c');
    const hand = {
      cards: [aceOfHearts, sevenOfDiamonds, sevenOfClubs, sevenOfSpades, fourOfClubs],
      rankArray: [0, 0, 1, 0, 0, 3, 0, 0, 0, 0, 0, 0, 1],
      suitArray: [1, 1, 2, 1]
    };
    expect(getFourOfKindRank(hand)).toBeNull();
  });

  it('for a four-of-kind hand, expect correct rank', () => {
    const sevenOfHearts = cards.find(c => c.key === '7h');
    const hand = {
      cards: [aceOfHearts, sevenOfDiamonds, sevenOfClubs, sevenOfSpades, sevenOfHearts],
      rankArray: [0, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 1],
      suitArray: [1, 2, 1, 1]
    };
    expect(getFourOfKindRank(hand)).toBe('Sevens');
  });
});
