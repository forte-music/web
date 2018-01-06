// @flow
import { orderArtwork } from './SongCollage';

it('works with four artworks', () => {
  const input = [1, 2, 3, 4];
  const actual = orderArtwork(input);
  expect(actual).toEqual([1, 2, 3, 4]);
});

it('works with two artworks', () => {
  const input = [1, 2];
  const actual = orderArtwork(input);
  expect(actual).toEqual([1, 2, 2, 1]);
});

it('works with three artworks', () => {
  const input = [1, 2, 3];
  const actual = orderArtwork(input);
  expect(actual).toEqual([1, 2, 3, 1]);
});

it('works with more than four artworks', () => {
  const input = [1, 2, 3, 4, 5, 6];
  const actual = orderArtwork(input);
  expect(actual).toEqual([1, 2, 3, 4]);
});
