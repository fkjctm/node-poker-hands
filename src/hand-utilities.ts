import {Card} from "./card";
import {CardRank, cardRankMap, CardSuit, cardSuitMap} from "./poker-types";

export abstract class HandUtilities {
  abstract getRankMap(cards: Card[]): number[];

  abstract getSuitMap(cards: Card[]): number[];

  abstract getRankName(rank: CardRank, plural?: boolean): string;

  abstract getSuitName(suit: CardSuit): string;

  abstract getHandScore(startValue: number, cards: Card[], ignoreAce?: boolean): number;
}

export class HandUtilitiesImpl extends HandUtilities {
  getRankMap(cards: Card[]): number[] {
    const map = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    cards.forEach(c => { map[c.rank]++; });
    return map;
  }

  getRankName(rank: CardRank, plural = false): string {
    const foundRank = cardRankMap.find(cr => cr.rank === rank) || cardRankMap[0];
    return plural ? foundRank.pluralName : foundRank.name;
  }

  getSuitMap(cards: Card[]): number[] {
    const map = [0, 0, 0, 0];
    cards.forEach(c => { map[c.suit]++; });
    return map;
  }

  getSuitName(suit: CardSuit): string {
    const foundSuit = cardSuitMap.find(cs => cs.suit === suit) || cardSuitMap[0];
    return foundSuit.name;
  }

  getHandScore(startValue: number, cards: Card[], ignoreAce = false): number {
    return startValue +
      cards.filter(c => (!(ignoreAce && c.rank === CardRank.Ace)))
      .map(c => c.getScore())
      .reduce((accum, current) => accum + current);
  }
}
