const cards = require('./cards');

const getFourOfKindRank = (hand) => {
  if (!hand.rankArray.some(r => r === 4)) {
    return null;
  }
  const rankValue = hand.rankArray.indexOf(4) + 1;
  const rank = cards.filter(c => c.rankValue === rankValue)[0].rank;
  return `${rank}s`;
};

module.exports = getFourOfKindRank;
