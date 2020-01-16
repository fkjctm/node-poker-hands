const cards = require('./cards');

const getFourOfKindRank = (hand) => {
  if (!hand.rankArray.some(r => r === 4)) {
    return null;
  }
  const rankValue = hand.rankArray.indexOf(4) + 1;
  const rank = cards.find(c => c.rankValue === rankValue).rank;
  return `${rank}s`;
};

module.exports = getFourOfKindRank;
