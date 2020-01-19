import {CardRank, cardRankMap, CardSuit, cardSuitMap} from "./poker-types";

export class Card {
  public static InvalidCard = 'Invalid card input';
  readonly rank: CardRank;
  readonly suit: CardSuit;

  constructor(card: string) {
    card = (card || '').trim().toUpperCase();
    if(card.length !== 2) throw new Error(Card.InvalidCard);

    const foundCardRankType = cardRankMap.find(cr => cr.symbol === card[0]);
    this.rank = foundCardRankType ? foundCardRankType.rank : CardRank.Unknown;
    if(this.rank === CardRank.Unknown) throw new Error(Card.InvalidCard);

    const foundCardSuitType = cardSuitMap.find(cs => cs.symbol === card[1]);
    this.suit = foundCardSuitType ? foundCardSuitType.suit : CardSuit.Unknown;
    if(this.suit === CardSuit.Unknown) throw new Error(Card.InvalidCard);
  }

  getRankName(plural = false): string {
    const foundCardRankType = cardRankMap.find(cr => cr.rank === this.rank) || cardRankMap[0];
    return plural ? foundCardRankType.pluralName : foundCardRankType.name;
  }

  getSuitName(): string {
    const foundCardSuitType = cardSuitMap.find(cs => cs.suit === this.suit) || cardSuitMap[0];
    return foundCardSuitType.name;
  }

  getScore(): number {
    return Math.pow(2, this.rank);
  }
}
