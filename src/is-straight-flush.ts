import {CardRank, HandTypeEvaluator, HandTypeEvaluatorResult} from "./poker-types";
import {Card} from "./card";
import {IsFlush} from "./is-flush";
import {IsStraight} from "./is-straight";
import {HandUtilities, HandUtilitiesImpl} from "./hand-utilities";

export class IsStraightFlush extends HandTypeEvaluator {
  public static readonly StartScore = 104000;
  private isFlush: HandTypeEvaluator;
  private isStraight: HandTypeEvaluator;
  private handUtilities: HandUtilities;

  constructor(isFlush?: HandTypeEvaluator, isStraight?: HandTypeEvaluator, handUtilities?: HandUtilities) {
    super();
    this.isFlush = isFlush || new IsFlush();
    this.isStraight = isStraight || new IsStraight();
    this.handUtilities = handUtilities || new HandUtilitiesImpl();
  }
  evaluate(cards: Card[]): HandTypeEvaluatorResult {
    const isFlush = this.isFlush.evaluate(cards);
    const isStraight = this.isStraight.evaluate(cards);
    if (!isFlush.matches || !isStraight.matches) {
      return { matches: false, score: 0, value: '' };
    }
    const isFiveHighStraight = (cards[0].rank === CardRank.Ace) && cards[1].rank === CardRank.Five;
    if(isFiveHighStraight) {
      const score = this.handUtilities.getHandScore(IsStraightFlush.StartScore, cards, true);
      return { matches: true, score,
        value: `Straight Flush: ${cards[0].getSuitName()}, Five High`
      };
    }

    const isRoyalFlush = (cards[0].rank === CardRank.Ace) && (cards[1].rank === CardRank.King);
    const score = this.handUtilities.getHandScore(IsStraightFlush.StartScore, cards, false);
    const result: HandTypeEvaluatorResult = { matches: true, score, value: ''};
    result.value = isRoyalFlush ? `Royal Flush: ${cards[0].getSuitName()}` :
      `Straight Flush: ${cards[0].getSuitName()}, ${cards[0].getRankName()} High`;
    return result;
  }
}
