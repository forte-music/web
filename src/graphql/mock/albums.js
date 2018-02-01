// @flow
import { albums } from '@forte-music/schema/fixtures/albums';
import type { AlbumSource } from '@forte-music/schema/fixtures/albums';
import { arrayPropertyDescriptor, makeMap, propertyDescriptor } from './utils';
import { songs, artists } from '.';
import type { Song, Artist, UserStats } from '.';
import { withUserStats } from './stats';

export type Album = {|
  id: string,
  name: string,
  artworkUrl: string,
  releaseYear: number,

  artist: Artist,
  songs: Song[],
  stats: UserStats,
  duration: number,
|};

const connectAlbum = (album: AlbumSource): Album =>
  // Flow doesn't completely understand defineProperties.
  // https://github.com/facebook/flow/issues/285
  // $ExpectError
  (Object.defineProperties(
    {
      id: album.id,
      name: album.name,
      artworkUrl: album.artworkUrl,
      releaseYear: album.releaseYear,
      stats: withUserStats(album),
    },
    {
      duration: {
        get() {
          return (this: Album).songs
            .map(({ duration = 0 } = {}) => duration)
            .reduce((a, b) => a + b, 0);
        },
      },

      artist: propertyDescriptor(() => artists, album.artistId),
      songs: arrayPropertyDescriptor(() => songs, album.songIds),
    }
  ): any);

const processedAlbums: Map<string, Album> = makeMap(albums.map(connectAlbum));
export default processedAlbums;
