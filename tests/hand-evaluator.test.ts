import {HandTypeEvaluatorResult} from "../src/poker-types";
import {HandEvaluatorImpl} from "../src/hand-evaluator";

describe('handEvaluator', () => {
  const mockedHand = { value: 'does-not-matter' };
  const defaultEvaluatorResult: HandTypeEvaluatorResult = { matches: false, value: '', score: 0 };
  const handTransformer = { transform: jest.fn() };
  const isStraightFlush = { evaluate: jest.fn() };
  const isFourOfKind = { evaluate: jest.fn() };
  const isFullHouse = { evaluate: jest.fn() };
  const isFlush = { evaluate: jest.fn() };
  const isStraight = { evaluate: jest.fn() };
  const isThreeOfKind = { evaluate: jest.fn() };
  const isTwoPair = { evaluate: jest.fn() };
  const isOnePair = { evaluate: jest.fn() };
  const isHighCard = { evaluate: jest.fn() };

  const defaultSetup = () => {
    handTransformer.transform.mockReturnValue(mockedHand);
    isStraightFlush.evaluate.mockReturnValue(defaultEvaluatorResult);
    isFourOfKind.evaluate.mockReturnValue(defaultEvaluatorResult);
    isFullHouse.evaluate.mockReturnValue(defaultEvaluatorResult);
    isFlush.evaluate.mockReturnValue(defaultEvaluatorResult);
    isStraight.evaluate.mockReturnValue(defaultEvaluatorResult);
    isThreeOfKind.evaluate.mockReturnValue(defaultEvaluatorResult);
    isTwoPair.evaluate.mockReturnValue(defaultEvaluatorResult);
    isOnePair.evaluate.mockReturnValue(defaultEvaluatorResult);
    isHighCard.evaluate.mockReturnValue(defaultEvaluatorResult);
  };

  const buildEvaluator = (customSetup: () => void) => {
    defaultSetup();
    customSetup();
    return new HandEvaluatorImpl(handTransformer, isStraightFlush, isFourOfKind,
      isFullHouse, isFlush, isStraight, isThreeOfKind, isTwoPair, isOnePair, isHighCard);
  };

  test('royal flush hand', () => {
    const evaluation: HandTypeEvaluatorResult = {
      matches: true, value: 'Royal Flush: Clubs', score: 300
    };
    const setup = () => {
      isStraightFlush.evaluate.mockReturnValue(evaluation);
    };

    const result = buildEvaluator(setup).evaluate('does-not-matter');
    expect(result.value).toBe(evaluation.value);
    expect(result.score).toBe(evaluation.score);
  });

  test('straight flush hand', () => {
    const evaluation: HandTypeEvaluatorResult = {
      matches: true, value: 'Straight Flush: Diamonds, Ten High', score: 300
    };
    const setup = () => {
      isStraightFlush.evaluate.mockReturnValue(evaluation);
    };

    const result = buildEvaluator(setup).evaluate('does-not-matter');
    expect(result.value).toBe(evaluation.value);
    expect(result.score).toBe(evaluation.score);
  });

  test('four of a kind hand', () => {
    const evaluation: HandTypeEvaluatorResult = {
      matches: true, value: 'Four of a Kind: Sevens', score: 300
    };
    const setup = () => {
      isFourOfKind.evaluate.mockReturnValue(evaluation);
    };

    const result = buildEvaluator(setup).evaluate('does-not-matter');
    expect(result.value).toBe(evaluation.value);
    expect(result.score).toBe(evaluation.score);
  });

  test('full house hand', () => {
    const evaluation: HandTypeEvaluatorResult = {
      matches: true, value: 'Full House: Queens over Tens', score: 300
    };
    const setup = () => {
      isFullHouse.evaluate.mockReturnValue(evaluation);
    };

    const result = buildEvaluator(setup).evaluate('does-not-matter');
    expect(result.value).toBe(evaluation.value);
    expect(result.score).toBe(evaluation.score);
  });

  test('flush hand', () => {
    const evaluation: HandTypeEvaluatorResult = {
      matches: true, value: 'Flush: Jack High', score: 300
    };
    const setup = () => {
      isFlush.evaluate.mockReturnValue(evaluation);
    };

    const result = buildEvaluator(setup).evaluate('does-not-matter');
    expect(result.value).toBe(evaluation.value);
    expect(result.score).toBe(evaluation.score);
  });

  test('straight hand', () => {
    const evaluation: HandTypeEvaluatorResult = {
      matches: true, value: 'Straight: Nine High', score: 300
    };
    const setup = () => {
      isStraight.evaluate.mockReturnValue(evaluation);
    };

    const result = buildEvaluator(setup).evaluate('does-not-matter');
    expect(result.value).toBe(evaluation.value);
    expect(result.score).toBe(evaluation.score);
  });

  test('three of a kind hand', () => {
    const evaluation: HandTypeEvaluatorResult = {
      matches: true, value: 'Three of a Kind: Fives', score: 300
    };
    const setup = () => {
      isThreeOfKind.evaluate.mockReturnValue(evaluation);
    };

    const result = buildEvaluator(setup).evaluate('does-not-matter');
    expect(result.value).toBe(evaluation.value);
    expect(result.score).toBe(evaluation.score);
  });

  test('two pair hand', () => {
    const evaluation: HandTypeEvaluatorResult = {
      matches: true, value: 'Two Pair: Aces and Eights', score: 300
    };
    const setup = () => {
      isTwoPair.evaluate.mockReturnValue(evaluation);
    };

    const result = buildEvaluator(setup).evaluate('does-not-matter');
    expect(result.value).toBe(evaluation.value);
    expect(result.score).toBe(evaluation.score);
  });

  test('one pair hand', () => {
    const evaluation: HandTypeEvaluatorResult = {
      matches: true, value: 'One Pair: Kings', score: 300
    };
    const setup = () => {
      isOnePair.evaluate.mockReturnValue(evaluation);
    };

    const result = buildEvaluator(setup).evaluate('does-not-matter');
    expect(result.value).toBe(evaluation.value);
    expect(result.score).toBe(evaluation.score);
  });

  test('high card hand', () => {
    const evaluation: HandTypeEvaluatorResult = {
      matches: true, value: 'High Card: Jack', score: 300
    };
    const setup = () => {
      isHighCard.evaluate.mockReturnValue(evaluation);
    };

    const result = buildEvaluator(setup).evaluate('does-not-matter');
    expect(result.value).toBe(evaluation.value);
    expect(result.score).toBe(evaluation.score);
  });

  test('if hand could not be matched, expect error', () => {
    const setup = () => {};
    expect(() => buildEvaluator(setup).evaluate('does-not-matter')).toThrow(HandEvaluatorImpl.UnknownHand);
  });
});
