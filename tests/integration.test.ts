import {HandEvaluatorImpl} from "../src/hand-evaluator";

describe('handEvaluator integration tests', () => {
  const handEvaluator = new HandEvaluatorImpl();

  test('royal flush test', () => {
    const result = handEvaluator.evaluate('Jc Ac Kc Tc Qc');
    expect(result.value).toBe('Royal Flush: Clubs');
  });

  test('straight flush test', () => {
    const result = handEvaluator.evaluate('6d 4d 7d 8d 5d');
    expect(result.value).toBe('Straight Flush: Diamonds, Eight High');
  });

  test('four of a kind test', () => {
    const result = handEvaluator.evaluate('Jh 8s Js Jd Jc');
    expect(result.value).toBe('Four of a Kind: Jacks');
  });

  test('full house test', () => {
    const result = handEvaluator.evaluate('2c 2d 2s Td Tc');
    expect(result.value).toBe('Full House: Deuces over Tens');
  });

  test('flush test', () => {
    const result = handEvaluator.evaluate('9h 3h Qh Jh 6h');
    expect(result.value).toBe('Flush: Hearts, Queen High');
  });

  test('straight test', () => {
    const result = handEvaluator.evaluate('6h 3c 5d 4s 7h');
    expect(result.value).toBe('Straight: Seven High');
  });

  test('three of kind test', () => {
    const result = handEvaluator.evaluate('Qs Th Qc Qd 8h');
    expect(result.value).toBe('Three of a Kind: Queens');
  });

  test('two pair test', () => {
    const result = handEvaluator.evaluate('9c 7d 9d 7h 2c');
    expect(result.value).toBe('Two Pair: Nines and Sevens');
  });

  test('one pair test', () => {
    const result = handEvaluator.evaluate('2c 6d Td Tc Js');
    expect(result.value).toBe('One Pair: Tens');
  });

  test('high card test', () => {
    const result = handEvaluator.evaluate('As Kd 8c 9d 2c');
    expect(result.value).toBe('High Card: Ace');
  });
});
