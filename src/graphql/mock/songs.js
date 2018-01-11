// @flow
import { songs } from '../data/songs.toml';
import {
  arrayPropertyDescriptor,
  makeMap,
  propertyDescriptor,
  propertyDescriptorWithSet,
} from './utils';
import { albums, artists, stats } from '.';
import type { SongUserStats, Album, Artist } from '.';

export type SongSource = {
  id: string,
  streamUrl: string,
  name: string,
  duration: number,

  trackNumber?: number,
  diskNumber?: number,
  artistIds?: string[],
  albumId: string,
  statsId: string,
};

const defaults = {
  trackNumber: 1,
  diskNumber: 1,
  artistIds: [],
};

export type Song = SongSource & {
  trackNumber: number,
  diskNumber: number,
  artists: Artist[],
  album: Album,
  stats: SongUserStats,
};

const connectSong = (source: SongSource) => {
  const song = { ...defaults, ...source };

  // $ExpectError
  return Object.defineProperties(song, {
    artists: arrayPropertyDescriptor(() => artists, song.artistIds),
    album: propertyDescriptor(() => albums, song.albumId),
    stats: propertyDescriptorWithSet(() => stats, song.statsId),
  });
};

const processedSongs: Map<string, Song> = makeMap(songs.map(connectSong));

export default processedSongs;
