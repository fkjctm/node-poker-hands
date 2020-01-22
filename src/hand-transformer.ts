import {Card} from "./card";
import {CardParser, CardParserImpl} from "./card-parser";

export abstract class HandTransformer {
  abstract transform(hand: string): Card[];
}

export class HandTransformerImpl extends HandTransformer {
  public static InvalidInput = 'Invalid input';
  private cardParser: CardParser;

  constructor(cardParser?: CardParser) {
    super();
    this.cardParser = cardParser || new CardParserImpl();
  }

  transform(hand: string): Card[] {
    hand = (hand || '').trim();
    const split = hand.split(' ').filter(c => c.length === 2);
    if(split.length !== 5) throw new Error(HandTransformerImpl.InvalidInput);

    const parsedCards = split
      .map(s => this.cardParser.parse(s))
      .filter(c => c !== null);
    if (parsedCards.length !== 5) throw new Error(HandTransformerImpl.InvalidInput);

    return parsedCards.sort((c1, c2) => {
      if(c1.getScore() === c2.getScore()) return 0;
      return c2.getScore() > c1.getScore() ? 1 : -1;
    });
  }
}
