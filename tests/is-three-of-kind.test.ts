import {IsThreeOfKind} from "../src/is-three-of-kind";
import {HandTypeEvaluator} from "../src/poker-types";

describe('IsThreeOfKind', () => {
  const handUtilities = { getRankMap: jest.fn(), getHandScore: jest.fn(), getRankName: jest.fn() };
  const buildService = () => new IsThreeOfKind(handUtilities as any);

  test('non-three-of-kind hand', () => {
    handUtilities.getRankMap.mockReturnValue([0, 0, 0, 0, 1, 0, 1, 0, 2, 1, 0, 0, 0]);

    expect(buildService().evaluate([])).toEqual(HandTypeEvaluator.NoMatchEvaluatorResult);
  });

  test('three-of-kind hand', () => {
    const rankMap = [0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0];
    const threeOfKindIndex = 8;
    rankMap[threeOfKindIndex] = 3;
    handUtilities.getRankMap.mockReturnValue(rankMap);
    handUtilities.getHandScore.mockReturnValue(100);
    handUtilities.getRankName.mockReturnValue('Tens');

    const result = buildService().evaluate([]);
    expect(result.matches).toBe(true);
    expect(result.score).toBe(100);
    expect(result.value).toBe(`Three of a Kind: Tens`);
    expect(handUtilities.getRankName).toHaveBeenCalledWith(threeOfKindIndex, true);
  });
});
