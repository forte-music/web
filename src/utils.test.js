// @flow
import { formatDuration, join, split } from './utils';

it('should format a mm:ss duration correctly', () =>
  expect(formatDuration(100)).toBe('01:40'));

it('should format a 00:00 duration correctly', () =>
  expect(formatDuration(0)).toBe('00:00'));

it('should format a 00:ss duration correctly', () =>
  expect(formatDuration(20)).toBe('00:20'));

it('should format an hh:mm:ss duration correctly', () =>
  expect(formatDuration(3601)).toBe('01:00:01'));

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
