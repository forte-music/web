// @flow
import { playlists } from '@forte-music/schema/fixtures/playlists';
import { makeMap, mustGetKeys } from './utils';
import { songs as songMap } from '.';
import type { Song } from '.';

export type PlaylistSource = {
  id: string,
  name: string,
  songIds: string[],
};

export type PlaylistItem = {
  id: string,
  song: Song,
};

export type Playlist = {
  items: PlaylistItem[],
  duration: number,
} & PlaylistSource;

const connectPlaylist = (playlist: PlaylistSource) =>
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
          return (this: Playlist).items
            .map(item => item.song.duration)
            .reduce((a, b) => a + b, 0);
        },
      },
    }
  );

const map: Map<string, Playlist> = makeMap(playlists.map(connectPlaylist));

export default map;
