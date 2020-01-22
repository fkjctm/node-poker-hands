import {IsFullHouse} from "../src/is-full-house";
import {CardRank} from "../src/poker-types";

describe('IsFullHouse', () => {
  const handUtilities = { getRankMap: jest.fn(), getRankName: jest.fn(), getHandScore: jest.fn() } as any;
  const buildService = () => new IsFullHouse(handUtilities);

  test('non-full-house hand', () => {
    handUtilities.getRankMap.mockReturnValue([0, 0, 1, 0, 1, 1, 0, 1, 1, 0, 0, 0, 0]);

    const result = buildService().evaluate([]);

    expect(result.matches).toBe(false);
    expect(result.score).toBe(0);
    expect(result.value).toBe('');
  });

  test('full-house hand', () => {
    handUtilities.getRankMap.mockReturnValue([0, 0, 0, 0, 0, 0, 0, 3, 2, 0, 0, 0, 0]);
    handUtilities.getRankName.mockImplementation((r: number) => r === 7 ? 'Nines' : 'Tens');
    handUtilities.getHandScore.mockReturnValue(100);

    const result = buildService().evaluate([]);

    expect(result.matches).toBe(true);
    expect(result.score).toBe(100);
    expect(result.value).toBe('Full House: Nines over Tens');
    expect(handUtilities.getRankName).toHaveBeenCalledWith(CardRank.Ten, true);
    expect(handUtilities.getRankName).toHaveBeenCalledWith(CardRank.Nine, true);
  });
});
