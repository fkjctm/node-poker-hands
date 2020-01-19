import {IsFourOfKind} from "../src/is-four-of-kind";
import {CardRank} from "../src/poker-types";

describe('IsFourOfKind', () => {
  const handUtilities = { getRankMap: jest.fn(), getRankName: jest.fn(), getHandScore: jest.fn() };
  const buildService = () => new IsFourOfKind(handUtilities as any);

  test('non-four of kind hand', () => {
    handUtilities.getRankMap.mockReturnValue([0, 0, 0, 0, 0, 0, 1, 0, 1, 3, 0, 0, 0]);

    const result = buildService().evaluate([]);

    expect(result.matches).toBe(false);
    expect(result.score).toBe(0);
    expect(result.value).toBe('');
  });

  test('four of kind hand', () => {
    handUtilities.getRankMap.mockReturnValue([0, 0, 0, 0, 0, 0, 1, 0, 0, 4, 0, 0, 0]);
    handUtilities.getRankName.mockReturnValue('Jacks');
    const handScore = 10000;
    handUtilities.getHandScore.mockReturnValue(handScore);

    const result = buildService().evaluate([]);

    expect(result.matches).toBe(true);
    expect(result.score).toBe(handScore);
    expect(result.value).toBe('Four of a Kind: Jacks');
    expect(handUtilities.getRankName).toHaveBeenCalledWith(CardRank.Jack, true);
  });
});
