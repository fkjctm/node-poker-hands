const cards = require('./cards');

const handTransformer = (hand) => {
  const parsedHand = (hand || '').trim();
  if(parsedHand.length < 1) throw new Error('Poker hand cannot be empty');

  const cardStrings = parsedHand.split(' ');
  const cardArr = [];
  cardStrings.forEach(cs => {
    if (cards.some(c => c.key === cs)) {
      cardArr.push(cards.filter(c => c.key === cs)[0]);
    }
  });
  if(cardArr.length !== cardStrings.length) throw new Error('Invalid card detected');

  return { cards: cardArr };

};

module.exports = handTransformer;
