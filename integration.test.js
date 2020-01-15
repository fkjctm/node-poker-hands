const pokerHandParser = require('./poker-hand-parser');

describe('pokerHandParser integration tests', () => {
  // f("As Kd 8c 9d 2c") -> "High Card: Ace"
  // f("2c 6d Td Tc Js") -> "One Pair: Tens"
  // f("9c 7d 9d 7h 2c") -> "Two Pair: Nines, Sevens"
  // f("Qs Th Qc Qd 8h") -> "Three of a Kind: Queens"
  // f("6h 3c 5d 4s 7h") -> "Straight: Seven High"
  // f("9h 3h Qh Jh 6h") -> "Flush: Hearts, Queen High"
  // f("2c 2d 2s Td Tc") -> "Full House: Deuces over Tens"
  // f("Jh 8s Js Jd Jc") -> "Four of a Kind: Jacks"

  test('royal flush test', () => {
    expect(pokerHandParser('Jc Ac Kc Tc Qc')).toBe('Royal Flush: Clubs');
  });

  test('straight flush test', () => {
    expect(pokerHandParser('6d 4d 7d 8d 5d')).toBe('Straight Flush: Diamonds, Eight High');
  });
});