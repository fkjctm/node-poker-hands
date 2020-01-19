import {CardSuit, HandTypeEvaluator, HandTypeEvaluatorResult} from "./poker-types";
import {Card} from "./card";
import {HandUtilities, HandUtilitiesImpl} from "./hand-utilities";

export class IsFlush extends HandTypeEvaluator {
  public static readonly StartScore = 60000;
  private handUtilities: HandUtilities;

  constructor(handUtilities?: HandUtilities) {
    super();
    this.handUtilities = handUtilities || new HandUtilitiesImpl();
  }
  evaluate(cards: Card[]): HandTypeEvaluatorResult {
    const suitMap = this.handUtilities.getSuitMap(cards);
    if (!suitMap.some(s => s === 5)) {
      return { matches: false, score: 0, value: '' };
    }

    const score = this.handUtilities.getHandScore(IsFlush.StartScore, cards, false);
    const value = `Flush: ${cards[0].getSuitName()}, ${cards[0].getRankName()} High`;
    return { matches: true, score, value};
  }
}
