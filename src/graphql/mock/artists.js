// @flow
import { artists } from '@forte-music/schema/fixtures/artists.toml';
import { arrayPropertyDescriptor, makeMap } from './utils';
import { albums } from '.';
import type { Album } from '.';

export type ArtistSource = {
  id: string,
  name: string,
  albumIds: string[],
};

export type Artist = {
  albums: Album[],
} & ArtistSource;

const connectArtist = (artist: ArtistSource) =>
  // $ExpectError
  Object.defineProperties(
    { ...artist },
    { albums: arrayPropertyDescriptor(() => albums, artist.albumIds) }
  );

const processedArtists: Map<string, Artist> = makeMap(
  artists.map(connectArtist)
);

export default processedArtists;
