import {Card} from "./card";

export interface HandEvaluatorResult {
  value: string;
  score: number;
}

export interface HandTypeEvaluatorResult extends HandEvaluatorResult{
  matches: boolean;
}

export abstract class HandTypeEvaluator {
  public static NoMatchEvaluatorResult: HandTypeEvaluatorResult = { matches: false, score: 0, value: '' };
  abstract evaluate(cards: Card[]): HandTypeEvaluatorResult;
}

export enum CardRank {
  Deuce = 0, Three = 1, Four = 2, Five = 3, Six = 4, Seven = 5, Eight = 6,
  Nine = 7, Ten = 8, Jack = 9, Queen = 10, King = 11, Ace = 12, Unknown = 13
}

export enum CardSuit {
  Spades = 0, Hearts = 1, Clubs = 2, Diamonds = 3, Unknown = 4
}

export interface CardMapBase {
  symbol: string;
  name: string;
}

export interface CardRankMapType extends CardMapBase {
  pluralName: string;
  rank: CardRank;
}

export interface CardSuitMapType extends CardMapBase {
  suit: CardSuit;
}

export const cardRankMap: CardRankMapType[] = [
  { symbol: '2', name: 'Deuce', rank: CardRank.Deuce, pluralName: 'Deuces' },
  { symbol: '3', name: 'Three', rank: CardRank.Three, pluralName: 'Threes' },
  { symbol: '4', name: 'Four', rank: CardRank.Four, pluralName: 'Fours' },
  { symbol: '5', name: 'Five', rank: CardRank.Five, pluralName: 'Fives' },
  { symbol: '6', name: 'Six', rank: CardRank.Six, pluralName: 'Sixes' },
  { symbol: '7', name: 'Seven', rank: CardRank.Seven, pluralName: 'Sevens' },
  { symbol: '8', name: 'Eight', rank: CardRank.Eight, pluralName: 'Eights' },
  { symbol: '9', name: 'Nine', rank: CardRank.Nine, pluralName: 'Nines' },
  { symbol: 'T', name: 'Ten', rank: CardRank.Ten, pluralName: 'Tens' },
  { symbol: 'J', name: 'Jack', rank: CardRank.Jack, pluralName: 'Jacks' },
  { symbol: 'Q', name: 'Queen', rank: CardRank.Queen, pluralName: 'Queens' },
  { symbol: 'K', name: 'King', rank: CardRank.King, pluralName: 'Kings' },
  { symbol: 'A', name: 'Ace', rank: CardRank.Ace, pluralName: 'Aces' },
];

export const cardSuitMap: CardSuitMapType[] = [
  { symbol: 'S', name: 'Spades', suit: CardSuit.Spades },
  { symbol: 'H', name: 'Hearts', suit: CardSuit.Hearts },
  { symbol: 'C', name: 'Clubs', suit: CardSuit.Clubs },
  { symbol: 'D', name: 'Diamonds', suit: CardSuit.Diamonds }
];
