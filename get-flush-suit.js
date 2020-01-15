
const getFlushSuit = (hand) => {
  if(!hand.suitArray.some(n => n === 5)) {
    return null; // no flush
  }
  return `${hand.cards[0].suit}s`;
};

module.exports = getFlushSuit;
