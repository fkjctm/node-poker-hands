import {HandEvaluatorResult} from "./poker-types";
import {HandCombinationsParser, HandCombinationsParserImpl} from "./hand-combinations-parser";
import {HandEvaluator, HandEvaluatorImpl} from "./hand-evaluator";

export abstract class HandOptimizer {
  abstract optimize(cardList: string): HandEvaluatorResult;
}

export class HandOptimizerImpl extends HandOptimizer {
  private readonly combinationsParser: HandCombinationsParser;
  private readonly handEvaluator: HandEvaluator;

  constructor(combinationsParser?: HandCombinationsParser, handEvaluator?: HandEvaluator) {
    super();
    this.combinationsParser = combinationsParser || new HandCombinationsParserImpl();
    this.handEvaluator = handEvaluator || new HandEvaluatorImpl();
  }

  optimize(cardList: string): HandEvaluatorResult {
    const combos = this.combinationsParser.parse(cardList);
    const sortedResults = combos.map(c => this.handEvaluator.evaluate(c)).sort((h1, h2) => {
      if (h1.score === h2.score) return 0;
      return h1.score > h2.score ? -1 : 1;
    });
    return sortedResults[0];
  }

}
