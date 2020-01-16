
const getFlushRank = (hand) => {
  if(!hand.suitArray.some(r => r === 5)) {
    return null;
  }
  return hand.cards[0].rank;
};

module.exports = getFlushRank;
