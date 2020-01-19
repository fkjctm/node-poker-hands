import {HandTransformerImpl} from "../src/hand-transformer";
import {HandEvaluatorImpl} from "../src/hand-evaluator";

describe('hand scoring tests', () => {

  test('the lowest one pair should beat the highest high-card hand', () => {
    const highCardHand = 'Ah Kd Qs Js 9c';
    const onePairHand = '2s 2c 3h 4d 5h';

    const service = new HandEvaluatorImpl();
    const highCardResult = service.evaluate(highCardHand);
    const onePairResult = service.evaluate(onePairHand);
    expect(onePairResult.score).toBeGreaterThan(highCardResult.score);
  });

  test('the lowest two pair should beat the highest one pair hand', () => {
    const onePairHand = 'As Ac Kh Qd Jh';
    const twoPairHand = '2s 2c 3h 3d 4h';

    const service = new HandEvaluatorImpl();
    const onePairResult = service.evaluate(onePairHand);
    const twoPairResult = service.evaluate(twoPairHand);
    expect(twoPairResult.score).toBeGreaterThan(onePairResult.score);
  });

  test('the lowest three of a kind should beat the highest two pair hand', () => {
    const twoPairHand = 'Ah As Kd Kc Qh';
    const threeOfKindHand = '2c 2s 2d 3h 4c';

    const service = new HandEvaluatorImpl();
    const twoPairResult = service.evaluate(twoPairHand);
    const threeOfKindResult = service.evaluate(threeOfKindHand);
    expect(threeOfKindResult.score).toBeGreaterThan(twoPairResult.score);
  });

  test('the lowest straight should beat the highest three of kind hand', () => {
    const threeOfKindHand = 'Ah As Ac Kd Qc';
    const straightHand = '2c 3d 4h 5s Ad';

    const service = new HandEvaluatorImpl();
    const threeOfKindResult = service.evaluate(threeOfKindHand);
    const straightResult = service.evaluate(straightHand);
    expect(straightResult.score).toBeGreaterThan(threeOfKindResult.score);
  });

  test('the lowest flush should beat the highest straight hand', () => {
    const straightHand = 'Td Jc Qc Ks Ah';
    const flushHand = '2c 3c 4c 5c 7c';

    const service = new HandEvaluatorImpl();
    const straightResult = service.evaluate(straightHand);
    const flushResult = service.evaluate(flushHand);
    expect(flushResult.score).toBeGreaterThan(straightResult.score);
  });

  test('the lowest full house should beat the highest flush hand', () => {
    const flushHand = 'Ah Kh Qh Jh 9h';
    const fullHouseHand = '2c 2s 2h 3d 3c';

    const service = new HandEvaluatorImpl();
    const flushResult = service.evaluate(flushHand);
    const fullHouseResult = service.evaluate(fullHouseHand);
    expect(fullHouseResult.score).toBeGreaterThan(flushResult.score);
  });

  test('the lowest four of kind should beat the highest full house hand', () => {
    const fullHouseHand = 'As Ad Ac Kd Kc';
    const fourOfKindHand = '2c 2s 2d 2h 3c';

    const service = new HandEvaluatorImpl();
    const fullHouseResult = service.evaluate(fullHouseHand);
    const fourOfKindResult = service.evaluate(fourOfKindHand);
    expect(fourOfKindResult.score).toBeGreaterThan(fullHouseResult.score);
  });

  test('the lowest straight flush should beat the highest four of kind hand', () => {
    const fourOfKindHand = 'Ac Ad As Ah Kc';
    const straightFlushHand = '2c 3c 4c 5c Ac';

    const service = new HandEvaluatorImpl();
    const fourOfKindResult = service.evaluate(fourOfKindHand);
    const straightFlushResult = service.evaluate(straightFlushHand);
    expect(straightFlushResult.score).toBeGreaterThan(fourOfKindResult.score);
  });
});
