const handTransformer = require('./hand-transformer');
const cards = require('./cards');

describe('handTransformer', () => {

  test('for an empty string expect error thrown', () => {
    [null, undefined, '', ' '].forEach(x => {
      expect(() => handTransformer(x)).toThrow('Poker hand cannot be empty');
    });
  });

  test('if the hand string contains a card that cannot be matched, expect error', () => {
    expect(() => handTransformer('Ts 7x')).toThrow('Invalid card detected');
  });

  test('if the hand string contains more than 5 cards, expect error', () => {
    expect(() => handTransformer('Ts 7c 9d 2h Ah 4c')).toThrow('Hand should only contain five cards');
  });

  test('valid single card string should return correct card array', () => {
    const result = handTransformer(' Jd ');
    const expectedCard = cards.filter(c => c.key === 'Jd')[0];

    expect(result.cards.length).toBe(1);
    expect(result.cards[0]).toBe(expectedCard);
    expect(result.suitArray).toEqual([0, 0, 0, 1]);
    expect(result.rankArray).toEqual([0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0]);
  });

  test('expect multi-card string to return correct card array', () => {
    const result = handTransformer('8c As');
    const eightOfClubs = cards.filter(c => c.key === '8c')[0];
    const aceOfSpades = cards.filter(c => c.key === 'As')[0];

    expect(result.cards.length).toBe(2);
    expect(result.cards).toContain(eightOfClubs);
    expect(result.cards).toContain(aceOfSpades);
    expect(result.suitArray).toEqual([1, 0, 1, 0]);
    expect(result.rankArray).toEqual([0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1]);
  });

});
