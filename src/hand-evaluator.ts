import {HandEvaluatorResult, HandTypeEvaluator} from "./poker-types";
import {HandTransformer, HandTransformerImpl} from "./hand-transformer";
import {IsStraightFlush} from "./is-straight-flush";
import {IsFourOfKind} from "./is-four-of-kind";
import {IsFullHouse} from "./is-full-house";
import {IsFlush} from "./is-flush";
import {IsStraight} from "./is-straight";
import {IsThreeOfKind} from "./is-three-of-kind";
import {IsTwoPair} from "./is-two-pair";
import {IsOnePair} from "./is-one-pair";
import {IsHighCard} from "./is-high-card";

export abstract class HandEvaluator {
  abstract evaluate(hand: string): HandEvaluatorResult;
}

export class HandEvaluatorImpl extends HandEvaluator{
  public static UnknownHand = 'Could not match hand';
  private readonly handTransformer: HandTransformer;
  private readonly isStraightFlush: HandTypeEvaluator;
  private readonly isFourOfKind: HandTypeEvaluator;
  private readonly isFullHouse: HandTypeEvaluator;
  private readonly isFlush: HandTypeEvaluator;
  private readonly isStraight: HandTypeEvaluator;
  private readonly isThreeOfKind: HandTypeEvaluator;
  private readonly isTwoPair: HandTypeEvaluator;
  private readonly isOnePair: HandTypeEvaluator;
  private readonly isHighCard: HandTypeEvaluator;

  constructor(handTransformer?: HandTransformer,
              isStraightFlush?: HandTypeEvaluator, isFourOfKind?: HandTypeEvaluator,
              isFullHouse?: HandTypeEvaluator, isFlush?: HandTypeEvaluator,
              isStraight?: HandTypeEvaluator, isThreeOfKind?: HandTypeEvaluator,
              isTwoPair?: HandTypeEvaluator, isOnePair?: HandTypeEvaluator,
              isHighCard?: HandTypeEvaluator) {
    super();
    this.handTransformer = handTransformer || new HandTransformerImpl();
    this.isStraightFlush = isStraightFlush || new IsStraightFlush();
    this.isFourOfKind = isFourOfKind || new IsFourOfKind();
    this.isFullHouse = isFullHouse || new IsFullHouse();
    this.isFlush = isFlush || new IsFlush();
    this.isStraight = isStraight || new IsStraight();
    this.isThreeOfKind = isThreeOfKind || new IsThreeOfKind();
    this.isTwoPair = isTwoPair || new IsTwoPair();
    this.isOnePair = isOnePair || new IsOnePair();
    this.isHighCard = isHighCard || new IsHighCard();
  }

  evaluate(hand: string): HandEvaluatorResult {
    const transformedHand = this.handTransformer.transform(hand);
    const evaluators = [this.isStraightFlush, this.isFourOfKind, this.isFullHouse,
      this.isFlush, this.isStraight, this.isThreeOfKind, this.isTwoPair, this.isOnePair, this.isHighCard];
    const evaluations = evaluators.map(evaluator => {
      return evaluator.evaluate(transformedHand);
    });
    const firstMatch = evaluations.find(evaluation => evaluation.matches);
    if (firstMatch) return { value: firstMatch.value, score: firstMatch.score };
    throw new Error(HandEvaluatorImpl.UnknownHand);
  }
}
