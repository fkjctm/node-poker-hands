import {IsStraight} from "../src/is-straight";
import {Card} from "../src/card";

describe('IsStraight', () => {
  const handUtilities = { getRankMap: jest.fn(), getHandScore: jest.fn() } as any;
  const buildService = () => new IsStraight(handUtilities);

  test('non-straight hand', () => {
    handUtilities.getRankMap.mockReturnValue([0,0,0,0,1,0,1,0,1,1,1,0,0]);

    const result = buildService().evaluate([]);

    expect(result.matches).toBe(false);
    expect(result.score).toBe(0);
    expect(result.value).toBe('');
  });

  test('five-high-straight hand', () => {
    handUtilities.getRankMap.mockReturnValue([1,1,1,1,0,0,0,0,0,0,0,0,1]);
    handUtilities.getHandScore.mockReturnValue(100);

    const result = buildService().evaluate([]);

    expect(result.matches).toBe(true);
    expect(result.score).toBe(100);
    expect(result.value).toBe('Straight: Five High');
  });

  test('regular straight hand', () => {
    handUtilities.getRankMap.mockReturnValue([0,0,0,0,0,1,1,1,1,1,0,0,0]);
    handUtilities.getHandScore.mockReturnValue(100);
    const jackOfDiamonds = { getRankName: () => 'Jack' } as Card;

    const result = buildService().evaluate([jackOfDiamonds]);

    expect(result.matches).toBe(true);
    expect(result.score).toBe(100);
    expect(result.value).toBe('Straight: Jack High');
  });
});
