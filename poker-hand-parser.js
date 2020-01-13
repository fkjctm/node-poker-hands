
const getFlushSuit = (hand) => {
  throw new Error('wip');
};
const getStraightHighCard = () => {
  throw new Error('wip');
};


const pokerHandParser = (hand, getFlushSuitFn, getStraightHighCardFn) => {
  const flushSuit = (getFlushSuitFn || getFlushSuit)(hand);
  const straightHighCard = (getStraightHighCardFn || getStraightHighCard)(hand);

  if(flushSuit !== null && straightHighCard === 'Ace') {
    return `Royal Flush, ${flushSuit}`;
  }
  if(flushSuit !== null && straightHighCard !== 'Ace') {
    return `Straight Flush, ${flushSuit}, ${straightHighCard} High`;
  }

  throw new Error('wip');
};

module.exports = pokerHandParser;
