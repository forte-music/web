// @flow
import { makeMap } from './utils';
import songs from './songs';

type PlaylistSource = {
  id: string,
  name: string,
  songs: string[],
};

const playlists: PlaylistSource[] = [
  {
    id: 'playlist:1',
    name: 'Quick Jam Session',
    songs: [
      '9283bed7-a183-4f54-a0d7-820946c220e3',
      '492667ee-5bed-45ff-8a2c-67277677cf86',
    ],
  },
  {
    id: 'playlist:2',
    name: 'Chill and Netflix',
    songs: ['69120ac9-1e48-494f-a1f4-4a34735fe408'],
  },
];

export type PlaylistItem = {
  id: string,
  song: string,
};

export type Playlist = {
  id: string,
  name: string,
  items: PlaylistItem[],
  duration: number,
};

const map: Map<string, Playlist> = makeMap(
  playlists.map((playlist: PlaylistSource): Playlist => ({
    ...playlist,
    items: playlist.songs.map((songKey, index): PlaylistItem => ({
      id: index.toString(),
      song: songKey,
    })),
    duration: playlist.songs
      .map(songKey => songs.get(songKey))
      .map(({ duration = 0 } = {}) => duration)
      .reduce((a, b) => a + b, 0),
  }))
);

export default map;
