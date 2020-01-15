
const getStraightHighCard = (hand) => {
  const cardArr = hand.cards.sort((c1, c2) => {
    if(c1.rankValue === c2.rankValue) return 0;
    return (c2.rankValue > c1.rankValue) ? 1 : -1
  });
  const rankArr = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  cardArr.forEach(c => {
    rankArr[c.rankValue - 1]++;
  });
  const rankString = rankArr.join('');
  if(rankString === '1111000000001') return 'Five';
  if(rankString.indexOf('11111') > 0) {
    return cardArr[0].rank;
  }
  return null;
};

module.exports = getStraightHighCard;
