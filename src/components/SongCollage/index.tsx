import React from 'react';

import { Artwork } from '../Artwork';
import DefaultCover from '../icons/DefaultCover';
import Collage from '../Collage';

export function must<T>(input: T | undefined): T {
  if (!input) {
    throw new TypeError('Invariant violated. This is probably a bug.');
  }

  return input;
}

// Ensures ensures that two of the same album artworks will never be
// displayed next to each other, but four artworks will be displayed even
// when less than four are provided. The album artwork not occurring next to
// each other is defined as follows (numbers are items at indexes):
//
//     3 != 1
//
//     4 != 3
//     4 != 2
//
// Elements in the input array must only occur once. The output is an array
// with indices 0..3 going clockwise starting from the top left.
export function orderArtwork<T>(arr: T[]): T[] {
  if (arr.length < 2) {
    throw new TypeError(
      `Called with an invalid number of items. At least two are needed. Length ${
        arr.length
      }`
    );
  }

  if (arr.length >= 4) {
    return arr.slice(0, 4);
  }

  const reversed = arr.slice().reverse();
  const first = arr[0];
  const second = arr[1];

  // Third will never be undefined because there will always be more than
  // two elements in the array and first will not equal second.
  const third: T = must(reversed.find(elem => elem !== first));

  // Fourth will never be undefined because there will always be more than
  // two elements in the array. Fourth can't be second, but can be first always.
  const fourth: T = must(
    reversed.find(elem => elem !== third && elem !== second)
  );

  return [first, second, third, fourth];
}

interface Props {
  alt: string;
  artworkUrls: string[];
}

// Given a list of songs, renders a collage of artwork with now two same
// artworks being adjacent.
const SongCollage = ({ artworkUrls: urls, alt }: Props) => {
  if (!urls.length) {
    // There are no album covers at all.
    return <DefaultCover />;
  }

  if (urls.length < 2) {
    // There must be at least one element in urls. If there are no elements,
    // the above case is triggered.
    const url: string = urls[0];
    const artwork = <Artwork src={url} alt={alt} />;

    return (
      <Collage
        topLeft={artwork}
        topRight={artwork}
        bottomLeft={artwork}
        bottomRight={artwork}
      />
    );
  }

  const unique: string[] = Array.from(new Set(urls));
  const [topLeft, topRight, bottomLeft, bottomRight] = orderArtwork(unique);

  return (
    <Collage
      topLeft={<Artwork src={topLeft} alt={alt} />}
      topRight={<Artwork src={topRight} alt={alt} />}
      bottomLeft={<Artwork src={bottomLeft} alt={alt} />}
      bottomRight={<Artwork src={bottomRight} alt={alt} />}
    />
  );
};

export default SongCollage;
