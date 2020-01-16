const pokerHandParser = require('./poker-hand-parser');

describe('pokerHandParser integration tests', () => {

  test('royal flush test', () => {
    expect(pokerHandParser('Jc Ac Kc Tc Qc')).toBe('Royal Flush: Clubs');
  });

  test('straight flush test', () => {
    expect(pokerHandParser('6d 4d 7d 8d 5d')).toBe('Straight Flush: Diamonds, Eight High');
  });

  test('four of a kind test', () => {
    expect(pokerHandParser('Jh 8s Js Jd Jc')).toBe('Four of a Kind: Jacks');
  });

  test('full house test', () => {
    expect(pokerHandParser('2c 2d 2s Td Tc')).toBe('Full House: Deuces over Tens');
  });

  test('flush test', () => {
    expect(pokerHandParser('9h 3h Qh Jh 6h')).toBe('Flush: Hearts, Queen High');
  });

  test('straight test', () => {
    expect(pokerHandParser('6h 3c 5d 4s 7h')).toBe('Straight: Seven High');
  });

  test('three of kind test', () => {
    expect(pokerHandParser('Qs Th Qc Qd 8h')).toBe('Three of a Kind: Queens');
  });

  test('two pair test', () => {
    expect(pokerHandParser('9c 7d 9d 7h 2c')).toBe('Two Pair: Nines and Sevens');
  });

  test('one pair test', () => {
    expect(pokerHandParser('2c 6d Td Tc Js')).toBe('One Pair: Tens');
  });

  // f("As Kd 8c 9d 2c") -> "High Card: Ace"
});
