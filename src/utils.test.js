// @flow
import { formatDuration, join } from './utils';

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
