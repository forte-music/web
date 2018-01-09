// @flow
import {
  arrayPropertyDescriptor,
  makeMap,
  propertyDescriptor,
  propertyDescriptorWithSet,
} from './utils';
import { albums, artists, stats } from '.';
import type { SongUserStats, Album, Artist } from '.';

type Source = {
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

const songs: Source[] = [
  {
    id: '69120ac9-1e48-494f-a1f4-4a34735fe408',
    streamUrl: '/music/01 - Stole the Show (feat. Parson James).flac',
    name: 'Stole the Show',
    albumId: '0d9396f5-5454-47ce-9bd8-dacaf2fbf6d0',
    duration: 3 * 60 + 43,
    statsId: 'c15cb775-ed42-436d-a2fb-f68d34d3e206',
  },
  {
    id: '9283bed7-a183-4f54-a0d7-820946c220e3',
    streamUrl:
      "/music/01 - I'm That... (Remix) [feat. Beenie Man & Azealia Banks].m4a",
    name: "I'm That (Remix)",
    albumId: '44db420c-0995-4a74-9cc2-0191d65bfdd0',
    duration: 3 * 60 + 31,
    statsId: '6782c701-e219-4646-b9c1-0817d62b58d9',
  },
  {
    id: '492667ee-5bed-45ff-8a2c-67277677cf86',
    streamUrl: '/music/01 - Bugatti (feat. Future & Rick Ross).flac',
    name: 'Bugatti',
    albumId: 'd0941f59-2138-433c-9ccf-368040228593',
    duration: 4 * 60 + 30,
    statsId: '7371509e-d31e-4f16-ae47-0ce375349fe7',
  },
];

export type Song = Source & {
  trackNumber: number,
  diskNumber: number,
  artists: Artist[],
  album: Album,
  stats: SongUserStats,
};

const processedSongs: Map<string, Song> = makeMap(
  songs.map(source => ({ ...defaults, ...source })).map(song =>
    // $ExpectError
    Object.defineProperties(song, {
      artists: arrayPropertyDescriptor(() => artists, song.artistIds),
      album: propertyDescriptor(() => albums, song.albumId),
      stats: propertyDescriptorWithSet(() => stats, song.statsId),
    })
  )
);

export default processedSongs;
