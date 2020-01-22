import {IsStraightFlush} from "../src/is-straight-flush";
import {Card} from "../src/card";
import {CardRank, CardSuit} from "../src/poker-types";

describe('isStraightFlush', () => {
  const isFlush = { evaluate: jest.fn() };
  const isStraight = { evaluate: jest.fn() };
  const handUtilities = { getHandScore: jest.fn() } as any;
  const buildService = () => new IsStraightFlush(isFlush, isStraight, handUtilities);

  describe('non-straight-flush hands', () => {
    test('for non-flush hands, expect non-matching result', () => {
      isFlush.evaluate.mockReturnValue({ matches: false });
      isStraight.evaluate.mockReturnValue({ matches: true });

      const result = buildService().evaluate([]);
      expect(result.matches).toBe(false);
      expect(result.value).toBe('');
      expect(result.score).toBe(0);
    });

    test('for non-straight hands, expect non-matching result', () => {
      isFlush.evaluate.mockReturnValue({ matches: true });
      isStraight.evaluate.mockReturnValue({ matches: false });

      const result = buildService().evaluate([]);
      expect(result.matches).toBe(false);
      expect(result.value).toBe('');
      expect(result.score).toBe(0);
    });
  });

  describe('valid straight flush hands', () => {
    const handScore = 100;
    const aceOfClubs = { rank: CardRank.Ace, suit: CardSuit.Clubs,
      getScore: () => 1, getSuitName: () => 'Clubs'} as Card;
    const kingOfClubs = { rank: CardRank.King, suit: CardSuit.Clubs,
      getScore: () => 1, getSuitName: () => 'Clubs', getRankName: () => 'King'} as Card;
    const fiveOfClubs = { rank: CardRank.Five, suit: CardSuit.Clubs} as Card;
    const queenOfClubs = { rank: CardRank.Queen, suit: CardSuit.Clubs } as Card;

    beforeEach(() => {
      isFlush.evaluate.mockReturnValue({ matches: true });
      isStraight.evaluate.mockReturnValue({ matches: true });
      handUtilities.getHandScore.mockReturnValue(handScore);
    });

    test('five-high straight flush', () => {
      const cards = [aceOfClubs, fiveOfClubs];
      const result = buildService().evaluate(cards);

      expect(result.matches).toBe(true);
      expect(result.value).toBe('Straight Flush: Clubs, Five High');
      expect(result.score).toBe(handScore);
      expect(handUtilities.getHandScore).toHaveBeenCalledWith(IsStraightFlush.StartScore, cards, true);
    });

    test('royal flush', () => {
      const cards = [aceOfClubs, kingOfClubs];
      const result = buildService().evaluate(cards);

      expect(result.matches).toBe(true);
      expect(result.value).toBe('Royal Flush: Clubs');
      expect(result.score).toBe(handScore);
      expect(handUtilities.getHandScore).toHaveBeenCalledWith(IsStraightFlush.StartScore, cards, false);
    });

    test('king-high straight flush', () => {
      const cards = [kingOfClubs, queenOfClubs];
      const result = buildService().evaluate(cards);

      expect(result.matches).toBe(true);
      expect(result.value).toBe('Straight Flush: Clubs, King High');
      expect(result.score).toBe(handScore);
      expect(handUtilities.getHandScore).toHaveBeenCalledWith(IsStraightFlush.StartScore, cards, false);
    });
  });
});
