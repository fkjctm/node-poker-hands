
const handTransformer = require('./hand-transformer');

const getFlushSuit = () => {
  throw new Error('wip');
};
const getStraightHighCard = () => {
  throw new Error('wip');
};
const getFourOfKindRank = () => {
  throw new Error('wip');
};
const getFullHouseRanks = () => {
  throw new Error('wip');
};
const getFlushRank = () => {
  throw new Error('wip');
};
const getThreeOfKindRank = () => {
  throw new Error('wip');
};
const getTwoPairRanks = () => {
  throw new Error('wip');
};
const getOnePairRank = () => {
  throw new Error('wip');
};
const getHighCardRank = () => {
  throw new Error('wip');
};

const pokerHandParser = (hand, helperFns) => {
  const helpers = helperFns || {
    handTransformer, getFlushSuit, getStraightHighCard, getFourOfKindRank, getFullHouseRanks,
    getFlushRank, getThreeOfKindRank, getTwoPairRanks, getOnePairRank, getHighCardRank
  };
  const transformedHand = helpers.handTransformer(hand);
  const flushSuit = helpers.getFlushSuit(transformedHand);
  const straightHighCard = helpers.getStraightHighCard(transformedHand);
  const fourOfKindRank = helpers.getFourOfKindRank(transformedHand);
  const fullHouseRanks = helpers.getFullHouseRanks(transformedHand);
  const flushRank = helpers.getFlushRank(transformedHand);
  const threeOfKindRank = helpers.getThreeOfKindRank(transformedHand);
  const twoPairRanks = helpers.getTwoPairRanks(transformedHand);
  const onePairRank = helpers.getOnePairRank(transformedHand);
  const highCardRank = helpers.getHighCardRank(transformedHand);

  if(flushSuit !== null && straightHighCard === 'Ace') {
    return `Royal Flush: ${flushSuit}`;
  }

  if(flushSuit !== null && straightHighCard !== null) {
    return `Straight Flush: ${flushSuit}, ${straightHighCard} High`;
  }

  if(fourOfKindRank) {
    return `Four of a Kind: ${fourOfKindRank}`;
  }

  if(fullHouseRanks) {
    return `Full House: ${fullHouseRanks}`;
  }

  if(flushSuit) {
    return `Flush: ${flushSuit}, ${flushRank} High`;
  }

  if(straightHighCard) {
    return `Straight: ${straightHighCard} High`;
  }

  if(threeOfKindRank) {
    return `Three of a Kind: ${threeOfKindRank}`;
  }

  if(twoPairRanks) {
    return `Two Pair: ${twoPairRanks}`;
  }

  if(onePairRank) {
    return `One Pair: ${onePairRank}`;
  }

  return `High Card: ${highCardRank}`;
};

module.exports = pokerHandParser;
