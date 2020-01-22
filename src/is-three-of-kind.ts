import {HandTypeEvaluator, HandTypeEvaluatorResult} from "./poker-types";
import {Card} from "./card";
import {HandUtilities, HandUtilitiesImpl} from "./hand-utilities";

export class IsThreeOfKind extends HandTypeEvaluator {
  public static readonly StartScore = 35000;
  private readonly handUtilities: HandUtilities;

  constructor(handUtilities?: HandUtilities) {
    super();
    this.handUtilities = handUtilities || new HandUtilitiesImpl();
  }

  evaluate(cards: Card[]): HandTypeEvaluatorResult {
    const ranks = this.handUtilities.getRankMap(cards);
    if (!ranks.some(r => r === 3)) {
      return HandTypeEvaluator.NoMatchEvaluatorResult;
    }

    const threeOfKindRank = ranks.indexOf(3);
    const score = this.handUtilities.getHandScore(IsThreeOfKind.StartScore, cards, false);
    return { matches: true, score, value: `Three of a Kind: ${this.handUtilities.getRankName(threeOfKindRank, true)}`};
  }
}
