import {HandCombinationsParserImpl} from "../src/hand-combinations-parser";

describe('HandCombinationsParser', () => {
  const buildService = () => new HandCombinationsParserImpl();

  describe('for empty arguments, expect error thrown', () => {
    const invalidInput = [
      { input: '', name: 'Empty string' },
      { input: '  ', name: 'Empty string with spaces' },
      { input: null, name: 'Null' },
      { input: undefined, name: 'Undefined' }
    ];
    invalidInput.forEach(data => {
      test(`${data.name} test`, () => {
        expect(() => buildService().parse(data.input as any))
          .toThrow(HandCombinationsParserImpl.InvalidInput);
      });
    });
  });

  describe('for strings with less than six elements, expect single string returned', () => {
    const combos = [
      { input: ' e1  ', name: 'Single element', expected: ['e1'] },
      { input: 'e1   e2 ', name: 'Two elements', expected: ['e1 e2'] },
      { input: 'e1 e2 e3', name: 'Three elements', expected: ['e1 e2 e3'] },
      { input: 'e1 e2 e3 e4', name: 'Four elements', expected: ['e1 e2 e3 e4'] },
      { input: 'e1 e2 e3 e4 e5', name: 'Five elements', expected: ['e1 e2 e3 e4 e5'] }
    ];

    combos.forEach(combo => {
      test(`${combo.name} test`, () => {
        expect(buildService().parse(combo.input)).toEqual(combo.expected);
      });
    });
  });

  describe('six or more combos', () => {

    test('six combination test', () => {
      const input = 'e1 e2 e3 e4 e5 e6';
      const expected = [
        'e1 e2 e3 e4 e5',
        'e1 e2 e3 e4 e6',
        'e1 e2 e3 e5 e6',
        'e1 e2 e4 e5 e6',
        'e1 e3 e4 e5 e6',
        'e2 e3 e4 e5 e6',
      ];
      expect(buildService().parse(input)).toEqual(expected);
    });
  });
});
