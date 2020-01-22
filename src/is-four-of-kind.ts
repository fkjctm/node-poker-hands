import {CardRank, HandTypeEvaluator, HandTypeEvaluatorResult} from "./poker-types";
import {Card} from "./card";
import {HandUtilities, HandUtilitiesImpl} from "./hand-utilities";

export class IsFourOfKind extends HandTypeEvaluator {
  public static readonly StartScore = 85000;
  private handUtilities: HandUtilities;

  constructor(handUtilities?: HandUtilities) {
    super();
    this.handUtilities = handUtilities || new HandUtilitiesImpl();
  }

  evaluate(cards: Card[]): HandTypeEvaluatorResult {
    const ranks = this.handUtilities.getRankMap(cards);

    if (!ranks.some(x => x === 4)) {
      return { matches: false, score: 0, value: '' };
    }

    const fourOfKindRank = <CardRank>ranks.indexOf(4);
    const score = this.handUtilities.getHandScore(IsFourOfKind.StartScore, cards, false);
    const value = `Four of a Kind: ${this.handUtilities.getRankName(fourOfKindRank, true)}`;
    return { matches: true, score, value};
  }

}
