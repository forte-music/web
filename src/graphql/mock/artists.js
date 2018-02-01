// @flow
import { artists } from '@forte-music/schema/fixtures/artists';
import type { ArtistSource } from '@forte-music/schema/fixtures/artists';
import { arrayPropertyDescriptor, makeMap } from './utils';
import { albums } from '.';
import type { Album, UserStats } from '.';
import { withUserStats } from './stats';

export type Artist = {|
  id: string,
  name: string,

  albums: Album[],
  stats: UserStats,
|};

const connectArtist = (artist: ArtistSource): Artist =>
  // $ExpectError
  (Object.defineProperties(
    {
      id: artist.id,
      name: artist.name,
      stats: withUserStats(artist),
    },
    { albums: arrayPropertyDescriptor(() => albums, artist.albumIds) }
  ): any);

const processedArtists: Map<string, Artist> = makeMap(
  artists.map(connectArtist)
);

export default processedArtists;
