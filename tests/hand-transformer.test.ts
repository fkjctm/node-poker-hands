import {HandTransformerImpl} from "../src/hand-transformer";
import {CardRank, CardSuit} from "../src/poker-types";
import {Card} from "../src/card";

describe('handTransformerImpl', () => {
  const cardParser = { parse: jest.fn() };
  cardParser.parse.mockImplementation(x => {
    try {
      return new Card(x);
    }
    catch(e) {
      return null;
    }
  });
  const buildTransformer = (): HandTransformerImpl => {
    return new HandTransformerImpl(cardParser);
  };

  describe('for empty or invalid input, expect error', () => {
    const tests = [
      { input: null, name: 'null input' },
      { input: '', name: 'empty string' },
      { input: '5d 8c', name: 'less than 5 cards' },
      { input: '5d 8c 9d 2hh As', name: 'card containing more than two characters' },
      { input: '5d 8c 9d 2x As', name: 'card containing invalid suit' },
      { input: '5d 8c 9d Xh As', name: 'card containing invalid rank' }
    ];
    tests.forEach(t => {
      test(t.name, () => {
        expect(() => buildTransformer().transform(t.input as any))
          .toThrow(HandTransformerImpl.InvalidInput);
      });
    });
  });

  test('for valid input, expect cards to be parsed and ordered with highest rank first', () => {
    const input = ' 3c 9d Js 2h Tc ';
    const result = buildTransformer().transform(input);

    expect(result[0].rank).toBe(CardRank.Jack);
    expect(result[0].suit).toBe(CardSuit.Spades);
    expect(result[1].rank).toBe(CardRank.Ten);
    expect(result[1].suit).toBe(CardSuit.Clubs);
    expect(result[2].rank).toBe(CardRank.Nine);
    expect(result[2].suit).toBe(CardSuit.Diamonds);
    expect(result[3].rank).toBe(CardRank.Three);
    expect(result[3].suit).toBe(CardSuit.Clubs);
    expect(result[4].rank).toBe(CardRank.Deuce);
    expect(result[4].suit).toBe(CardSuit.Hearts);
  });
});
