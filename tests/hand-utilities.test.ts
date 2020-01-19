import {HandUtilitiesImpl} from "../src/hand-utilities";
import {Card} from "../src/card";
import {CardRank, cardRankMap, CardSuit, cardSuitMap} from "../src/poker-types";

describe('handUtilitiesImpl', () => {
  const buildService = () => new HandUtilitiesImpl();

  describe('getRankMap', () => {
    test('for an empty array, expect map with all zeroes', () => {
      const result = buildService().getRankMap([]);

      expect(result).toEqual([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
    });

    test('for five cards, expect map with proper ranks set', () => {
      const deuce = { rank: CardRank.Deuce } as Card;
      const five = { rank: CardRank.Five } as Card;
      const ten = { rank: CardRank.Ten } as Card;
      const queen = { rank: CardRank.Queen } as Card;
      const ace = { rank: CardRank.Ace } as Card;

      const cards = [deuce, five, ten, queen, ace];
      const result = buildService().getRankMap(cards);

      expect(result).toEqual([1, 0, 0, 1, 0, 0, 0, 0, 1, 0, 1, 0, 1]);
      const rankSum = result.reduce((accum, current) => accum + current);
      expect(rankSum).toBe(cards.length);
    });
  });

  describe('getSuitMap', () => {

    test('for an empty array, expect map with all zeroes', () => {
      const result = buildService().getSuitMap([]);

      expect(result).toEqual([0, 0, 0, 0]);
    });

    test('for four cards, expect map with proper suits set', () => {
      const spade = { suit: CardSuit.Spades } as Card;
      const heart = { suit: CardSuit.Hearts } as Card;
      const club = { suit: CardSuit.Clubs } as Card;
      const diamond = { suit: CardSuit.Diamonds } as Card;

      const result = buildService().getSuitMap([spade, heart, club, diamond]);

      expect(result).toEqual([1, 1, 1, 1]);
    });
  });

  describe('getRankName', () => {
    cardRankMap.forEach(cr => {
      test(`${cr.name} test`, () => {
        const service = buildService();
        expect(service.getRankName(cr.rank)).toBe(cr.name);
        expect(service.getRankName(cr.rank, true)).toBe(cr.pluralName);
      });
    });
  });

  describe('getSuitName', () => {
    cardSuitMap.forEach(cs => {
      test(`${cs.name} test`, () => {
        const service = buildService();
        expect(service.getSuitName(cs.suit)).toBe(cs.name);
      });
    });
  });

  describe('getHandScore', () => {

    test('include Ace test', () => {
      const ace = { rank: CardRank.Ace, getScore: () => 100 } as Card;
      const jack = { rank: CardRank.Jack, getScore: () => 80 } as Card;
      const eight = { rank: CardRank.Eight, getScore: () => 60 } as Card;
      const startingValue = 1000;

      const expectedScore = startingValue + ace.getScore() + jack.getScore() + eight.getScore();
      expect(buildService().getHandScore(startingValue, [ace, jack, eight], false)).toBe(expectedScore);
    });

    test('ignore Ace test', () => {
      const ace = { rank: CardRank.Ace, getScore: () => 100 } as Card;
      const jack = { rank: CardRank.Jack, getScore: () => 80 } as Card;
      const eight = { rank: CardRank.Eight, getScore: () => 60 } as Card;
      const startingValue = 1000;

      const expectedScore = startingValue + jack.getScore() + eight.getScore();
      expect(buildService().getHandScore(startingValue, [ace, jack, eight], true)).toBe(expectedScore);
    });
  });
});
