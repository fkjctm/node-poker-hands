const cards = require('./cards');

const getThreeOfKindRank = (hand) => {
  if (!hand.rankArray.some(r => r === 3)){
    return null;
  }
  const rankValue = hand.rankArray.indexOf(3) + 1;
  const rank = cards.find(c => c.rankValue === rankValue).rank;
  return `${rank}s`;
};

module.exports = getThreeOfKindRank;
