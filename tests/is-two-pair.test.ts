import {IsTwoPair} from "../src/is-two-pair";
import {CardRank, HandTypeEvaluator} from "../src/poker-types";

describe('IsTwoPair', () => {
  const handUtilities = { getRankMap: jest.fn(), getHandScore: jest.fn(), getRankName: jest.fn() };
  const buildService = () => new IsTwoPair(handUtilities as any);

  test('non-two-pair hand', () => {
    const rankMap = [0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    const eightsIndex = 7;
    const kingsIndex = 11;
    rankMap[eightsIndex] = 1;
    rankMap[kingsIndex] = 2;
    handUtilities.getRankMap.mockReturnValue(rankMap);

    expect(buildService().evaluate([])).toEqual(HandTypeEvaluator.NoMatchEvaluatorResult);
  });

  test('two-pair hand', () => {
    const rankMap = [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    const eightsIndex = 7;
    const kingsIndex = 11;
    rankMap[eightsIndex] = 2;
    rankMap[kingsIndex] = 2;
    handUtilities.getRankMap.mockReturnValue(rankMap);
    handUtilities.getHandScore.mockReturnValue(100);
    handUtilities.getRankName.mockImplementation((rank: CardRank) => {
      return rank === 7 ? 'Eights' : 'Kings';
    });

    const result = buildService().evaluate([]);
    expect(result.matches).toBe(true);
    expect(result.score).toBe(100);
    expect(result.value).toBe(`Two Pair: Kings and Eights`);
    expect(handUtilities.getRankName).toHaveBeenCalledWith(eightsIndex, true);
    expect(handUtilities.getRankName).toHaveBeenCalledWith(kingsIndex, true);
  });
});
