const getFourOfKindRank = require('./get-four-of-kind-rank');
const cards = require('./cards');

describe('getFourOfKindRank', () => {
  const sevenOfDiamonds = cards.filter(c => c.key === '7d')[0];
  const sevenOfClubs = cards.filter(c => c.key === '7c')[0];
  const sevenOfSpades = cards.filter(c => c.key === '7s')[0];
  const aceOfHearts = cards.filter(c => c.key === 'Ah')[0];

  it('for a non-four-of-kind hand, expect null', () => {
    const fourOfClubs = cards.filter(c => c.key === '4c')[0];
    const hand = {
      cards: [aceOfHearts, sevenOfDiamonds, sevenOfClubs, sevenOfSpades, fourOfClubs],
      rankArray: [0, 0, 1, 0, 0, 3, 0, 0, 0, 0, 0, 0, 1],
      suitArray: [1, 1, 2, 1]
    };
    expect(getFourOfKindRank(hand)).toBeNull();
  });

  it('for a four-of-kind hand, expect correct rank', () => {
    const sevenOfHearts = cards.filter(c => c.key === '7h')[0];
    const hand = {
      cards: [aceOfHearts, sevenOfDiamonds, sevenOfClubs, sevenOfSpades, sevenOfHearts],
      rankArray: [0, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 1],
      suitArray: [1, 2, 1, 1]
    };
    expect(getFourOfKindRank(hand)).toBe('Sevens');
  });
});
