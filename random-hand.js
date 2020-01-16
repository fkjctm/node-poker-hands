const cards = require('./cards');
const parser = require('./poker-hand-parser');

const numberOfHands = process.argv[2] || 1;

const getIndexes = () => {
  idxList = [];
  while(idxList.length < 5) {
    const idx = Math.floor(Math.random() * cards.length);
    if(idxList.indexOf(idx) < 0) idxList.push(idx);
  }
  return idxList;
};

const getRandomHandString = () => {
  return getIndexes().map(idx => cards[idx].key).join(' ');
};

for(let i = 0; i < numberOfHands; i++) {
  const handString = getRandomHandString();
  const parsedHand = parser(handString);

  console.log(`Cards: '${handString}', Hand: '${parsedHand}'`);
}
