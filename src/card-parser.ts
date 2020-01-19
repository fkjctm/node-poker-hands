import {Card} from "./card";

export abstract class CardParser {
  abstract parse(card: string): Card;
}

export class CardParserImpl extends CardParser {
  parse(card: string): Card {
    return new Card(card);
  }
}
