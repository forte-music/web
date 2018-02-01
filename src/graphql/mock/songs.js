// @flow
import { songs } from '@forte-music/schema/fixtures/songs';
import type { SongSource } from '@forte-music/schema/fixtures/songs';
import { arrayPropertyDescriptor, makeMap, propertyDescriptor } from './utils';
import { albums, artists } from '.';
import type { SongUserStats, Album, Artist } from '.';
import { statsId, defaultUserStats } from './stats';

export type Song = {
  id: string,
  streamUrl: string,
  name: string,
  duration: number,
  trackNumber: number,
  diskNumber: number,

  artists: Artist[],
  album: Album,
  stats: SongUserStats,
};

const connectSong = (source: SongSource): Song =>
  // $ExpectError
  (Object.defineProperties(
    {
      id: source.id,
      streamUrl: source.streamUrl,
      name: source.name,
      duration: source.duration,

      trackNumber: source.trackNumber || 1,
      diskNumber: source.diskNumber || 1,
      stats: songStats(source),
    },
    {
      artists: arrayPropertyDescriptor(() => artists, source.artistIds || []),
      album: propertyDescriptor(() => albums, source.albumId),
    }
  ): any);

const songStats = ({
  id,
  stats: { liked = false, ...remainingStats } = {},
}: SongSource): SongUserStats => ({
  id: songStatsId(id),
  liked: liked,
  stats: {
    id: statsId(id),
    ...defaultUserStats,
    ...remainingStats,
  },
});

const songStatsId = (id: string): string => `${statsId(id)}:song`;

const processedSongs: Map<string, Song> = makeMap(songs.map(connectSong));

export default processedSongs;
