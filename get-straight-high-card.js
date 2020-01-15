
const getStraightHighCard = (hand) => {
  const rankString = hand.rankArray.join('');
  if(rankString === '1111000000001') return 'Five';
  if(rankString.indexOf('11111') > 0) {
    return hand.cards[0].rank;
  }
  return null;
};

module.exports = getStraightHighCard;
