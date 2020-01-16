const cards = require('./cards');

const getOnePairRank = (hand) => {
  if (!hand.rankArray.some(r => r === 2)) {
    return null;
  }
  const rankVal = hand.rankArray.indexOf(2) + 1;
  const rank = cards.find(c => c.rankValue === rankVal).rank;
  return `${rank}s`;
};

module.exports = getOnePairRank;
