import {IsHighCard} from "../src/is-high-card";
import {CardRank, HandTypeEvaluator} from "../src/poker-types";

describe('IsHighCard', () => {
  const handUtilities = { getRankMap: jest.fn(), getHandScore: jest.fn() };
  const buildService = () => new IsHighCard(handUtilities as any);

  test('non-high-card hand', () => {
    const rankMap = [0, 0, 2, 0, 1, 0, 0, 1, 0, 1, 0, 0, 0];
    handUtilities.getRankMap.mockReturnValue(rankMap);

    expect(buildService().evaluate([])).toEqual(HandTypeEvaluator.NoMatchEvaluatorResult);
  });

  test('high-card hand', () => {
    const rankMap = [0, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0];
    handUtilities.getRankMap.mockReturnValue(rankMap);
    handUtilities.getHandScore.mockReturnValue(100);
    const kingOfDiamonds = { rank: CardRank.King, getRankName: jest.fn() } as any;
    kingOfDiamonds.getRankName.mockReturnValue('King');

    const result = buildService().evaluate([kingOfDiamonds]);
    expect(result.matches).toBe(true);
    expect(result.score).toBe(100);
    expect(result.value).toBe('High Card: King');
    expect(kingOfDiamonds.getRankName).toHaveBeenCalledWith(false);
  });
});
