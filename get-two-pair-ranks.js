const cards = require('./cards');

const getTwoPairRanks = (hand) => {
  if (! (hand.rankArray.filter(r => r === 2).length === 2 ) ) {
    return null;
  }
  const lowRankVal = hand.rankArray.indexOf(2);
  const highRankVal = hand.rankArray.findIndex((r, idx) => {
    return r === 2 && idx > lowRankVal;
  });
  const highRank = cards.find(c => c.rankValue === (highRankVal+1)).rank;
  const lowRank = cards.find(c => c.rankValue === (lowRankVal+1)).rank;
  return `${highRank}s and ${lowRank}s`;
};

module.exports = getTwoPairRanks;
