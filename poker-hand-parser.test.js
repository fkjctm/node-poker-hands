const pokerHandParser = require('./poker-hand-parser');

describe('pokerHandParser', () => {

  test('royal flush', () => {
    const getFlush = jest.fn().mockReturnValue('Clubs');
    const getStraight = jest.fn().mockReturnValue('Ace');
    const hand = 'Tc Jc Qc Kc Ac';

    expect(pokerHandParser(hand, getFlush, getStraight)).toBe('Royal Flush, Clubs');
    expect(getFlush).toBeCalledWith(hand);
  });

  test('straight flush', () => {
    const getFlush = jest.fn().mockReturnValue('Clubs');
    const getStraight = jest.fn().mockReturnValue('King');
    const hand = '9c Tc Jc Qc Kc';

    expect(pokerHandParser(hand, getFlush, getStraight)).toBe('Straight Flush, Clubs, King High');
  });
});
