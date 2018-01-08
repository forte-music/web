// @flow
import { arrayPropertyDescriptor, makeMap } from './utils';
import { albums } from '.';
import type { Album } from '.';

export type Source = {
  id: string,
  name: string,
  albumIds: string[],
};

const artists: Source[] = [
  {
    id: 'b4976c45-3362-4e50-9274-63a375b3a299',
    name: 'Kygo',
    albumIds: ['0d9396f5-5454-47ce-9bd8-dacaf2fbf6d0'],
  },
  {
    id: 'c1e012c3-f496-41e9-aa67-a060b666bd78',
    name: 'R. City',
    albumIds: ['44db420c-0995-4a74-9cc2-0191d65bfdd0'],
  },
  {
    id: '79506046-e727-405b-924a-2daf428e772f',
    name: 'Ace Hood',
    albumIds: ['d0941f59-2138-433c-9ccf-368040228593'],
  },
  {
    id: '04f6d289-154c-4602-9a33-e27d4be265d7',
    name: 'G-Eazy',
    albumIds: ['fc1acc4a-8e76-493c-ae3b-e71a88d41bbf'],
  },
];

export type Artist = {
  albums: Album[],
} & Source;

const processedArtists: Map<string, Artist> = makeMap(
  artists.map(artist =>
    // $ExpectError
    Object.defineProperties(
      { ...artist },
      { albums: arrayPropertyDescriptor(() => albums, artist.albumIds) }
    )
  )
);

export default processedArtists;
