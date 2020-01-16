
const getHighCardRank = (hand) => {
  if (!hand.rankArray.every(r => r <= 1)) {
    throw new Error('Could not parse hand');
  }
  return hand.cards[0].rank;
};

module.exports = getHighCardRank;
