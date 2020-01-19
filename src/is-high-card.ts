import {HandTypeEvaluator, HandTypeEvaluatorResult} from "./poker-types";
import {Card} from "./card";
import {HandUtilities, HandUtilitiesImpl} from "./hand-utilities";

export class IsHighCard extends HandTypeEvaluator {
  public static readonly StartScore = 0;
  private readonly handUtilities: HandUtilities;

  constructor(handUtilities?: HandUtilities) {
    super();
    this.handUtilities = handUtilities || new HandUtilitiesImpl();
  }

  evaluate(cards: Card[]): HandTypeEvaluatorResult {
    const ranks = this.handUtilities.getRankMap(cards);
    if (!ranks.every(r => r <= 1)) return HandTypeEvaluator.NoMatchEvaluatorResult;

    const score = this.handUtilities.getHandScore(IsHighCard.StartScore, cards, false);
    const value = `High Card: ${cards[0].getRankName(false)}`;
    return { matches: true, score, value };
  }
}
