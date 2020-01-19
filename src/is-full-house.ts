import {HandTypeEvaluator, HandTypeEvaluatorResult} from "./poker-types";
import {Card} from "./card";
import {HandUtilities, HandUtilitiesImpl} from "./hand-utilities";

export class IsFullHouse extends HandTypeEvaluator {
  public static readonly StartScore = 68000;
  private handUtilities: HandUtilities;

  constructor(handUtilities?: HandUtilities) {
    super();
    this.handUtilities = handUtilities || new HandUtilitiesImpl();
  }

  evaluate(cards: Card[]): HandTypeEvaluatorResult {
    const rankMap = this.handUtilities.getRankMap(cards);
    const hasThreeOfKind = rankMap.some(r => r === 3);
    const hasPair = rankMap.some(r => r === 2);
    if (!hasThreeOfKind || !hasPair) {
      return { matches: false, score: 0, value: '' };
    }

    const threeOfKindRank = this.handUtilities.getRankName(rankMap.indexOf(3), true);
    const pairRank = this.handUtilities.getRankName(rankMap.indexOf(2), true);
    const value = `Full House: ${threeOfKindRank} over ${pairRank}`;
    const score = this.handUtilities.getHandScore(IsFullHouse.StartScore, cards, false);
    return { matches: true, value, score };
  }
}
