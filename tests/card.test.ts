import {CardRank, cardRankMap, CardSuit} from "../src/poker-types";
import {Card} from "../src/card";

describe('Card class, testing all ranks and suits', () => {

  describe('invalid cards', () => {
    const invalidCards = [
      { hand: 'Jsh', name: 'too many characters' },
      { hand: null, name: 'null value' },
      { hand: '', name: 'empty string' },
      { hand: 'Jx', name: 'invalid suit' },
      { hand: 'Wd', name: 'invalid rank' }
    ];

    invalidCards.forEach(card => {
      test(card.name, () => {
        expect(() => new Card(card.hand as any)).toThrow(Card.InvalidCard);
      });
    });
  });

  describe('valid cards', () => {
    const tests = [
      {hand: '2s', rank: CardRank.Deuce, suit: CardSuit.Spades, rankName: 'Deuce', suitName: 'Spades', score: Math.pow(2, 0)},
      {hand: ' 3s', rank: CardRank.Three, suit: CardSuit.Spades, rankName: 'Three', suitName: 'Spades', score: Math.pow(2, 1)},
      {hand: '4s ', rank: CardRank.Four, suit: CardSuit.Spades, rankName: 'Four', suitName: 'Spades', score: Math.pow(2, 2)},
      {hand: '5s', rank: CardRank.Five, suit: CardSuit.Spades, rankName: 'Five', suitName: 'Spades', score: Math.pow(2, 3)},
      {hand: '6h', rank: CardRank.Six, suit: CardSuit.Hearts, rankName: 'Six', suitName: 'Hearts', score: Math.pow(2, 4)},
      {hand: '7h', rank: CardRank.Seven, suit: CardSuit.Hearts, rankName: 'Seven', suitName: 'Hearts', score: Math.pow(2, 5)},
      {hand: '8h', rank: CardRank.Eight, suit: CardSuit.Hearts, rankName: 'Eight', suitName: 'Hearts', score: Math.pow(2, 6)},
      {hand: '9c', rank: CardRank.Nine, suit: CardSuit.Clubs, rankName: 'Nine', suitName: 'Clubs', score: Math.pow(2, 7)},
      {hand: 'Tc', rank: CardRank.Ten, suit: CardSuit.Clubs, rankName: 'Ten', suitName: 'Clubs', score: Math.pow(2, 8)},
      {hand: 'Jc', rank: CardRank.Jack, suit: CardSuit.Clubs, rankName: 'Jack', suitName: 'Clubs', score: Math.pow(2, 9)},
      {hand: 'Qd', rank: CardRank.Queen, suit: CardSuit.Diamonds, rankName: 'Queen', suitName: 'Diamonds', score: Math.pow(2, 10)},
      {hand: 'Kd', rank: CardRank.King, suit: CardSuit.Diamonds, rankName: 'King', suitName: 'Diamonds', score: Math.pow(2, 11)},
      {hand: 'Ad', rank: CardRank.Ace, suit: CardSuit.Diamonds, rankName: 'Ace', suitName: 'Diamonds', score: Math.pow(2, 12)}
    ];

    tests.forEach(t => {
      test(`card: '${t.hand}'`, () => {
        const card = new Card(t.hand);
        expect(card.rank).toBe(t.rank);
        expect(card.suit).toBe(t.suit);
        expect(card.getRankName()).toBe(t.rankName);
        expect(card.getRankName(true)).toBe(t.rankName === 'Six' ? 'Sixes' : t.rankName + 's');
        expect(card.getSuitName()).toBe(t.suitName);
        expect(card.getScore()).toBe(t.score);
      });
    });
  });
});
