
const getFlushSuit = (hand) => {
  let flushSuit = null;
  ['Spade', 'Heart', 'Club', 'Diamond'].forEach(suit => {
    const suitCount = hand.cards.filter(c => c.suit === suit).length;
    if(suitCount > 4) flushSuit = suit;
  });
  return !!flushSuit ? `${flushSuit}s` : null;
};

module.exports = getFlushSuit;
