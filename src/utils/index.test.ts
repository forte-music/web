import { genRange, join, split } from '.';

it('should join things', () => {
  const joined = join([1, 2, 3], Infinity);

  expect(joined).toEqual([1, Infinity, 2, Infinity, 3]);
});

it('should split things into two buckets', () => {
  const inputs = [1, 2, 3, 4, 5, 6, 7];
  expect(split(inputs, n => n % 2 === 0)).toEqual({
    failed: [1, 3, 5, 7],
    accepted: [2, 4, 6],
  });
});

it('should generate numbers from 0 to n-1 inclusive', () => {
  expect(Array.from(genRange(10))).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
});
