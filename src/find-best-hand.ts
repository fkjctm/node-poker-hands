import {HandOptimizerImpl} from "./hand-optimizer";

const cardList = process.argv[2];

const handOptimizer = new HandOptimizerImpl();
const result = handOptimizer.optimize(cardList);

console.log(`Card List: ${cardList}, Best Hand: '${result.value}', Score: ${result.score}`);
