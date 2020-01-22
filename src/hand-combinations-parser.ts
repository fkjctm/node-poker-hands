
export abstract class HandCombinationsParser {
  abstract parse(cardList: string): string[];
}

export class HandCombinationsParserImpl extends HandCombinationsParser {
  public static readonly InvalidInput = 'Invalid combination input';
  parse(cardList: string): string[] {
    const input = (cardList || '').trim();
    if(input.length < 1) throw new Error(HandCombinationsParserImpl.InvalidInput);

    const elements = input.split(' ').filter(x => x.length > 0);
    if (elements.length < 6) {
      return [ elements.join(' ') ];
    } else {
      const combos = [];
      for (let i = 0; i <= (elements.length - 5); i++) {
        for (let j = (i+1); j <= (elements.length - 4); j++) {
          for (let k = (j+1); k <= (elements.length - 3); k++) {
            for (let l = (k+1); l <= (elements.length - 2); l++) {
              for (let m = (l+1); m <= (elements.length - 1); m++) {
                const current = [elements[i], elements[j], elements[k], elements[l], elements[m]];
                combos.push(current.join(' '));
              }
            }
          }
        }
      }
      return combos;
    }
  }
}
