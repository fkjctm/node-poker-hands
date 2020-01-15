const cards = require('./cards');

const handTransformer = (hand) => {
  const parsedHand = (hand || '').trim();
  if(parsedHand.length < 1) throw new Error('Poker hand cannot be empty');

  const cardStrings = parsedHand.split(' ');
  if(cardStrings.length > 5) throw new Error('Hand should only contain five cards');
  const cardArr = [];
  const rankArr = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  const suitArr = [0, 0, 0, 0];
  cardStrings.forEach(cs => {
    if (cards.some(c => c.key === cs)) {
      const foundCard = cards.filter(c => c.key === cs)[0];
      rankArr[foundCard.rankValue - 1]++;
      suitArr[foundCard.suitValue - 1]++;
      cardArr.push(foundCard);
    }
  });
  if(cardArr.length !== cardStrings.length) throw new Error('Invalid card detected');

  const sortedCards = cardArr.sort((c1, c2) => {
    if(c1.cardRank === c2.cardRank) return 0;
    return c2.cardRank > c1.cardRank ? 1 : -1;
  });

  return { cards: sortedCards, rankArray: rankArr, suitArray: suitArr };

};

module.exports = handTransformer;
