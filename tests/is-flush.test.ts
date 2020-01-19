import {IsFlush} from "../src/is-flush";
import {CardRank, CardSuit} from "../src/poker-types";
import {Card} from "../src/card";

describe('IsFlush', () => {
  const handUtilities = { getSuitMap: jest.fn(), getSuitName: jest.fn(),
    getHandScore: jest.fn() } as any;
  const buildService = () => new IsFlush(handUtilities);

  test('non-flush hand', () => {
    handUtilities.getSuitMap.mockReturnValue([1, 2, 1, 1]);
    const result = buildService().evaluate([]);

    expect(result.matches).toBe(false);
    expect(result.score).toBe(0);
    expect(result.value).toBe('');
  });

  test('flush hand', () => {
    handUtilities.getSuitMap.mockReturnValue([0, 5, 0, 0]);
    handUtilities.getSuitName.mockReturnValue('Hearts');
    handUtilities.getHandScore.mockReturnValue(100);
    const tenOfHearts = { getSuitName: () => 'Hearts', getRankName: () => 'Ten' } as Card;

    const result = buildService().evaluate([tenOfHearts]);

    expect(result.matches).toBe(true);
    expect(result.score).toBe(100);
    expect(result.value).toBe('Flush: Hearts, Ten High');
  });
});
