import {HandOptimizerImpl} from "../src/hand-optimizer";
import {HandEvaluatorResult} from "../src/poker-types";

describe('HandOptimizer', () => {
  const combinationsParser = { parse: jest.fn() };
  const handEvaluator = { evaluate: jest.fn() };
  const buildService = () => new HandOptimizerImpl(combinationsParser, handEvaluator);

  test('given several card combinations, expect the highest score to be returned', () => {
    const input = 'does-not-matter';
    const combos = ['c1', 'c2', 'c3'];
    combinationsParser.parse.mockReturnValue(combos);
    const evalResult1: HandEvaluatorResult = { score: 100, value: 'Result 1' };
    const evalResult2: HandEvaluatorResult = { score: 300, value: 'Result 2' };
    const evalResult3: HandEvaluatorResult = { score: 200, value: 'Result 3' };
    handEvaluator.evaluate.mockImplementation(c => {
      if (c === 'c1') return evalResult1;
      if (c === 'c2') return evalResult2;
      if (c === 'c3') return evalResult3;
    });

    const result = buildService().optimize(input);
    expect(result).toBe(evalResult2);
    expect(combinationsParser.parse).toHaveBeenCalledWith(input);
  });
});
