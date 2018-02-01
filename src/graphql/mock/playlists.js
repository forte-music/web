// @flow
import { playlists } from '@forte-music/schema/fixtures/playlists';
import type { PlaylistSource } from '@forte-music/schema/fixtures/playlists';
import { makeMap, mustGetKeys } from './utils';
import { songs as songMap } from '.';
import type { Song, UserStats } from '.';
import { withUserStats } from './stats';

export type PlaylistItem = {
  id: string,
  song: Song,
};

export type Playlist = {|
  id: string,
  name: string,
  description: string,

  stats: UserStats,
  items: PlaylistItem[],
  duration: number,
|};

const connectPlaylist = (playlist: PlaylistSource): Playlist =>
  // $ExpectError
  (Object.defineProperties(
    {
      id: playlist.id,
      name: playlist.name,
      description: playlist.description || '',
      stats: withUserStats(playlist),
    },
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
  ): any);

const map: Map<string, Playlist> = makeMap(playlists.map(connectPlaylist));

export default map;
