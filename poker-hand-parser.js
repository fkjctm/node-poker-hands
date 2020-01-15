
const handTransformer = require('./hand-transformer');
const getFlushSuit = require('./get-flush-suit');
const getStraightHighCard = require('./get-straight-high-card');

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

  if(flushSuit !== null && straightHighCard === 'Ace') {
    return `Royal Flush: ${flushSuit}`;
  }

  if(flushSuit !== null && straightHighCard !== null) {
    return `Straight Flush: ${flushSuit}, ${straightHighCard} High`;
  }

  const fourOfKindRank = helpers.getFourOfKindRank(transformedHand);
  if(fourOfKindRank) {
    return `Four of a Kind: ${fourOfKindRank}`;
  }

  const fullHouseRanks = helpers.getFullHouseRanks(transformedHand);
  if(fullHouseRanks) {
    return `Full House: ${fullHouseRanks}`;
  }

  const flushRank = helpers.getFlushRank(transformedHand);
  if(flushSuit) {
    return `Flush: ${flushSuit}, ${flushRank} High`;
  }

  if(straightHighCard) {
    return `Straight: ${straightHighCard} High`;
  }

  const threeOfKindRank = helpers.getThreeOfKindRank(transformedHand);
  if(threeOfKindRank) {
    return `Three of a Kind: ${threeOfKindRank}`;
  }

  const twoPairRanks = helpers.getTwoPairRanks(transformedHand);
  if(twoPairRanks) {
    return `Two Pair: ${twoPairRanks}`;
  }

  const onePairRank = helpers.getOnePairRank(transformedHand);
  if(onePairRank) {
    return `One Pair: ${onePairRank}`;
  }

  const highCardRank = helpers.getHighCardRank(transformedHand);
  return `High Card: ${highCardRank}`;
};

module.exports = pokerHandParser;
