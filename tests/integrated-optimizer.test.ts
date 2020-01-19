import {HandOptimizerImpl} from "../src/hand-optimizer";

describe('Hand optimizer integration tests', () => {
  const optimizer = () => new HandOptimizerImpl();

  const tests = [
    { input: '7h 8c 2d 2c Jc 7c Ac', expected: 'Flush: Clubs, Ace High' },
    { input: '7d Jc 9d Jd 2s Js Jh', expected: 'Four of a Kind: Jacks' },
    { input: 'Kd 3h 2d Ac 9c 4s 5c Js', expected: 'Straight: Five High' },
    { input: 'Kd Ac 9s 2d As Ad 9c Qs 6h', expected: 'Full House: Aces over Nines' },
  ];
  tests.forEach(t => {
    test(`${t.input} => ${t.expected}`, () => {
      const result = optimizer().optimize(t.input);
      expect(result.value).toBe(t.expected);
    });
  });
});
