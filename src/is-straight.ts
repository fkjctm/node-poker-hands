import {HandTypeEvaluator, HandTypeEvaluatorResult} from "./poker-types";
import {Card} from "./card";
import {HandUtilities, HandUtilitiesImpl} from "./hand-utilities";

export class IsStraight extends HandTypeEvaluator {
  public static readonly StartScore = 51000;
  private handUtilities: HandUtilities;

  constructor(handUtilities?: HandUtilities) {
    super();
    this.handUtilities = handUtilities || new HandUtilitiesImpl();
  }

  evaluate(cards: Card[]): HandTypeEvaluatorResult {
    const ranks = this.handUtilities.getRankMap(cards).join('');
    const isFiveHighStraight = ranks === '1111000000001';
    if (isFiveHighStraight) {
      return { matches: true, value: 'Straight: Five High',
        score: this.handUtilities.getHandScore(IsStraight.StartScore, cards, true)};
    }

    const isStraight = ranks.indexOf('11111') > -1;
    if (!isStraight) {
      return { matches: false, value: '', score: 0 };
    }
    return { matches: true, value: `Straight: ${cards[0].getRankName()} High`,
      score: this.handUtilities.getHandScore(IsStraight.StartScore, cards, false)};
  }
}
