const pokerHandParser = require('./poker-hand-parser');

describe('pokerHandParser', () => {
  const dummyHand = 'does-not-matter';
  const transformedHand = { message: 'does-not-matter' };
  const handTransformer = jest.fn();
  const getFlushSuit = jest.fn();
  const getStraightHighCard = jest.fn();
  const getFourOfKindRank = jest.fn();
  const getFullHouseRanks = jest.fn();
  const getFlushRank = jest.fn();
  const getThreeOfKindRank = jest.fn();
  const getTwoPairRanks = jest.fn();
  const getOnePairRank = jest.fn();
  const getHighCardRank = jest.fn();
  const callParser = () => {
    handTransformer.mockReturnValue(transformedHand);
    const helpers = {
      handTransformer, getFlushSuit, getStraightHighCard, getFourOfKindRank, getFullHouseRanks,
      getFlushRank, getThreeOfKindRank, getTwoPairRanks, getOnePairRank, getHighCardRank
    };
    return pokerHandParser(dummyHand, helpers);
  };

  test('royal flush', () => {
    getFlushSuit.mockReturnValue('Clubs');
    getStraightHighCard.mockReturnValue('Ace');

    expect(callParser()).toBe('Royal Flush: Clubs');
    expect(getFlushSuit).toBeCalledWith(transformedHand);
    expect(getStraightHighCard).toBeCalledWith(transformedHand);
  });

  test('straight flush', () => {
    getFlushSuit.mockReturnValue('Clubs');
    getStraightHighCard.mockReturnValue('King');

    expect(callParser()).toBe('Straight Flush: Clubs, King High');
    expect(getFlushSuit).toBeCalledWith(transformedHand);
    expect(getStraightHighCard).toBeCalledWith(transformedHand);
  });

  test('four of a kind', () => {
    getFlushSuit.mockReturnValue(null);
    getStraightHighCard.mockReturnValue(null);
    getFourOfKindRank.mockReturnValue('Eights');

    expect(callParser()).toBe('Four of a Kind: Eights');
    expect(getFlushSuit).toBeCalledWith(transformedHand);
    expect(getStraightHighCard).toBeCalledWith(transformedHand);
    expect(getFourOfKindRank).toBeCalledWith(transformedHand);
  });

  test('full house', () => {
    getFlushSuit.mockReturnValue(null);
    getStraightHighCard.mockReturnValue(null);
    getFourOfKindRank.mockReturnValue(null);
    getFullHouseRanks.mockReturnValue('Jacks over Nines');

    expect(callParser()).toBe('Full House: Jacks over Nines');
    expect(getFlushSuit).toBeCalledWith(transformedHand);
    expect(getStraightHighCard).toBeCalledWith(transformedHand);
    expect(getFourOfKindRank).toBeCalledWith(transformedHand);
    expect(getFullHouseRanks).toBeCalledWith(transformedHand);
  });

  test('flush', () => {
    getFlushSuit.mockReturnValue('Diamonds');
    getStraightHighCard.mockReturnValue(null);
    getFourOfKindRank.mockReturnValue(null);
    getFullHouseRanks.mockReturnValue(null);
    getFlushRank.mockReturnValue('Queen');

    expect(callParser()).toBe('Flush: Diamonds, Queen High');
    expect(getFlushSuit).toBeCalledWith(transformedHand);
    expect(getStraightHighCard).toBeCalledWith(transformedHand);
    expect(getFourOfKindRank).toBeCalledWith(transformedHand);
    expect(getFullHouseRanks).toBeCalledWith(transformedHand);
    expect(getFlushRank).toBeCalledWith(transformedHand);
  });

  test('straight', () => {
    getFlushSuit.mockReturnValue(null);
    getStraightHighCard.mockReturnValue('Jack');
    getFourOfKindRank.mockReturnValue(null);
    getFullHouseRanks.mockReturnValue(null);
    getFlushRank.mockReturnValue(null);

    expect(callParser()).toBe('Straight: Jack High');
    expect(getFlushSuit).toBeCalledWith(transformedHand);
    expect(getStraightHighCard).toBeCalledWith(transformedHand);
    expect(getFourOfKindRank).toBeCalledWith(transformedHand);
    expect(getFullHouseRanks).toBeCalledWith(transformedHand);
    expect(getFlushRank).toBeCalledWith(transformedHand);
  });

  test('three of a kind', () => {
    getFlushSuit.mockReturnValue(null);
    getStraightHighCard.mockReturnValue(null);
    getFourOfKindRank.mockReturnValue(null);
    getFullHouseRanks.mockReturnValue(null);
    getFlushRank.mockReturnValue(null);
    getThreeOfKindRank.mockReturnValue("Kings");

    expect(callParser()).toBe('Three of a Kind: Kings');
    expect(getFlushSuit).toBeCalledWith(transformedHand);
    expect(getStraightHighCard).toBeCalledWith(transformedHand);
    expect(getFourOfKindRank).toBeCalledWith(transformedHand);
    expect(getFullHouseRanks).toBeCalledWith(transformedHand);
    expect(getFlushRank).toBeCalledWith(transformedHand);
    expect(getThreeOfKindRank).toBeCalledWith(transformedHand);
  });

  test('two pair', () => {
    getFlushSuit.mockReturnValue(null);
    getStraightHighCard.mockReturnValue(null);
    getFourOfKindRank.mockReturnValue(null);
    getFullHouseRanks.mockReturnValue(null);
    getFlushRank.mockReturnValue(null);
    getThreeOfKindRank.mockReturnValue(null);
    getTwoPairRanks.mockReturnValue('Aces, Sevens');

    expect(callParser()).toBe('Two Pair: Aces, Sevens');
    expect(getFlushSuit).toBeCalledWith(transformedHand);
    expect(getStraightHighCard).toBeCalledWith(transformedHand);
    expect(getFourOfKindRank).toBeCalledWith(transformedHand);
    expect(getFullHouseRanks).toBeCalledWith(transformedHand);
    expect(getFlushRank).toBeCalledWith(transformedHand);
    expect(getThreeOfKindRank).toBeCalledWith(transformedHand);
    expect(getTwoPairRanks).toBeCalledWith(transformedHand);
  });

  test('one pair', () => {
    getFlushSuit.mockReturnValue(null);
    getStraightHighCard.mockReturnValue(null);
    getFourOfKindRank.mockReturnValue(null);
    getFullHouseRanks.mockReturnValue(null);
    getFlushRank.mockReturnValue(null);
    getThreeOfKindRank.mockReturnValue(null);
    getTwoPairRanks.mockReturnValue(null);
    getOnePairRank.mockReturnValue('Sixes');

    expect(callParser()).toBe('One Pair: Sixes');
    expect(getFlushSuit).toBeCalledWith(transformedHand);
    expect(getStraightHighCard).toBeCalledWith(transformedHand);
    expect(getFourOfKindRank).toBeCalledWith(transformedHand);
    expect(getFullHouseRanks).toBeCalledWith(transformedHand);
    expect(getFlushRank).toBeCalledWith(transformedHand);
    expect(getThreeOfKindRank).toBeCalledWith(transformedHand);
    expect(getTwoPairRanks).toBeCalledWith(transformedHand);
    expect(getOnePairRank).toBeCalledWith(transformedHand);
  });

  test('high card', () => {
    getFlushSuit.mockReturnValue(null);
    getStraightHighCard.mockReturnValue(null);
    getFourOfKindRank.mockReturnValue(null);
    getFullHouseRanks.mockReturnValue(null);
    getFlushRank.mockReturnValue(null);
    getThreeOfKindRank.mockReturnValue(null);
    getTwoPairRanks.mockReturnValue(null);
    getOnePairRank.mockReturnValue(null);
    getHighCardRank.mockReturnValue('Ten');

    expect(callParser()).toBe('High Card: Ten');
    expect(getFlushSuit).toBeCalledWith(transformedHand);
    expect(getStraightHighCard).toBeCalledWith(transformedHand);
    expect(getFourOfKindRank).toBeCalledWith(transformedHand);
    expect(getFullHouseRanks).toBeCalledWith(transformedHand);
    expect(getFlushRank).toBeCalledWith(transformedHand);
    expect(getThreeOfKindRank).toBeCalledWith(transformedHand);
    expect(getTwoPairRanks).toBeCalledWith(transformedHand);
    expect(getOnePairRank).toBeCalledWith(transformedHand);
    expect(getHighCardRank).toBeCalledWith(transformedHand);
  });
});
