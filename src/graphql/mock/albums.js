// @flow
import { albums } from '@forte-music/schema/fixtures/albums.toml';
import { arrayPropertyDescriptor, makeMap, propertyDescriptor } from './utils';
import { songs, artists } from '.';
import type { Song, Artist } from '.';

export type AlbumSource = {
  id: string,
  name: string,
  artworkUrl: string,
  artistId: string,
  songIds: string[],
  releaseYear: number,
};

export type Album = {
  duration: number,
  artist: Artist,
  songs: Song[],
} & AlbumSource;

const connectAlbum = (album: AlbumSource): Album =>
  // Flow doesn't completely understand defineProperties.
  // https://github.com/facebook/flow/issues/285
  // $ExpectError
  Object.defineProperties(
    {
      ...album,
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
  );

const processedAlbums: Map<string, Album> = makeMap(albums.map(connectAlbum));
export default processedAlbums;
