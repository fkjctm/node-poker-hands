const cards = require('./cards');

const getFullHouseRanks = (hand) => {
  if (!hand.rankArray.some(r => r === 3)) {
    return null;
  }
  if (!hand.rankArray.some(r => r === 2)) {
    return null;
  }
  const threeOfKindRank = hand.rankArray.indexOf(3) + 1;
  const pairRank = hand.rankArray.indexOf(2) + 1;
  const threeOfKindRankString = cards.find(x => x.rankValue === threeOfKindRank).rank;
  const pairRankString = cards.find(x => x.rankValue === pairRank).rank;
  return `${threeOfKindRankString}s over ${pairRankString}s`;
};

module.exports = getFullHouseRanks;
