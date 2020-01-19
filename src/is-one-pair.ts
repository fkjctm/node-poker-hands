import {HandTypeEvaluator, HandTypeEvaluatorResult} from "./poker-types";
import {Card} from "./card";
import {HandUtilities, HandUtilitiesImpl} from "./hand-utilities";

export class IsOnePair extends HandTypeEvaluator {
  public static readonly StartScore = 8000;
  private readonly handUtilities: HandUtilities;

  constructor(handUtilities?: HandUtilities) {
    super();
    this.handUtilities = handUtilities || new HandUtilitiesImpl();
  }

  evaluate(cards: Card[]): HandTypeEvaluatorResult {
    const ranks = this.handUtilities.getRankMap(cards);
    const onePairIndex = ranks.indexOf(2);
    if (onePairIndex < 0) return HandTypeEvaluator.NoMatchEvaluatorResult;

    const score = this.handUtilities.getHandScore(IsOnePair.StartScore, cards);
    const onePairRankName = this.handUtilities.getRankName(onePairIndex, true);
    const value = `One Pair: ${onePairRankName}`;
    return { matches: true, value, score };
  }
}
