import {IsOnePair} from "../src/is-one-pair";
import {HandTypeEvaluator} from "../src/poker-types";

describe('IsOnePair', () => {
  const handUtilities = { getRankMap: jest.fn(), getHandScore: jest.fn(), getRankName: jest.fn() };
  const buildService = () => new IsOnePair(handUtilities as any);

  test('non-one-pair hand', () => {
    const rankMap = [0, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 0, 0];
    const threesIndex = 1;
    rankMap[threesIndex] = 1;
    handUtilities.getRankMap.mockReturnValue(rankMap);

    expect(buildService().evaluate([])).toEqual(HandTypeEvaluator.NoMatchEvaluatorResult);
  });

  test('one-pair hand', () => {
    const rankMap = [1, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0];
    const threesIndex = 1;
    rankMap[threesIndex] = 2;
    handUtilities.getRankMap.mockReturnValue(rankMap);
    handUtilities.getHandScore.mockReturnValue(100);
    handUtilities.getRankName.mockReturnValue('Threes');

    const result = buildService().evaluate([]);
    expect(result.matches).toBe(true);
    expect(result.score).toBe(100);
    expect(result.value).toBe(`One Pair: Threes`);
    expect(handUtilities.getRankName).toHaveBeenCalledWith(threesIndex, true);
  });
});
