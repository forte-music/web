// @flow
import { makeMap, mustGetKeys } from './utils';
import { songs as songMap } from '.';
import type { Song } from '.';

type Source = {
  id: string,
  name: string,
  songIds: string[],
};

const playlists: Source[] = [
  {
    id: 'playlist:1',
    name: 'Quick Jam Session',
    songIds: [
      '9283bed7-a183-4f54-a0d7-820946c220e3',
      '492667ee-5bed-45ff-8a2c-67277677cf86',
    ],
  },
  {
    id: 'playlist:2',
    name: 'Chill and Netflix',
    songIds: ['69120ac9-1e48-494f-a1f4-4a34735fe408'],
  },
];

export type PlaylistItem = {
  id: string,
  song: Song,
};

export type Playlist = {
  items: PlaylistItem[],
  duration: number,
} & Source;

const map: Map<string, Playlist> = makeMap(
  playlists.map(playlist =>
    // $ExpectError
    Object.defineProperties(
      { ...playlist },
      {
        items: {
          get() {
            const songs: Song[] = mustGetKeys(songMap, playlist.songIds);
            return songs.map((song, index) => ({
              id: `${playlist.id}:${index}`,
              song: song,
            }));
          },
        },
        duration: {
          get() {
            return this.items
              .map(item => item.song.duration)
              .reduce((a, b) => a + b, 0);
          },
        },
      }
    )
  )
);

export default map;
