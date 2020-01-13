const pokerHandParser = require('./poker-hand-parser');

describe('pokerHandParser', () => {

  test('royal flush', () => {
    expect(pokerHandParser('Tc Jc Qc Kc Ac')).toBe('Royal Flush, Clubs');
  });
});
