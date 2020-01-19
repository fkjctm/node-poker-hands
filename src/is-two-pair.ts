import {HandTypeEvaluator, HandTypeEvaluatorResult} from "./poker-types";
import {Card} from "./card";
import {HandUtilities, HandUtilitiesImpl} from "./hand-utilities";

export class IsTwoPair extends HandTypeEvaluator {
  public static readonly StartScore = 20000;
  private readonly handUtilities: HandUtilities;

  constructor(handUtilities?: HandUtilities) {
    super();
    this.handUtilities = handUtilities || new HandUtilitiesImpl();
  }

  evaluate(cards: Card[]): HandTypeEvaluatorResult {
    const ranks = this.handUtilities.getRankMap(cards);
    const lowRankIndex = ranks.indexOf(2);
    if (lowRankIndex < 0) return HandTypeEvaluator.NoMatchEvaluatorResult;

    const highRankIndex = ranks.indexOf(2, lowRankIndex+1);
    if (highRankIndex < 0) return HandTypeEvaluator.NoMatchEvaluatorResult;

    const score = this.handUtilities.getHandScore(IsTwoPair.StartScore, cards);
    const lowRankName = this.handUtilities.getRankName(lowRankIndex, true);
    const highRankName = this.handUtilities.getRankName(highRankIndex, true);
    const value = `Two Pair: ${highRankName} and ${lowRankName}`;
    return { matches: true, value, score };
  }
}
