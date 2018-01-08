// @flow
import { addToQueue } from './actions/queue';
import store from './store';

// Some mock data and types used for testing. This will be replaced with graphql
// and generated types using apollo-codegen.

export type Artist = {
  id: string,
  name: string,
};

export type Album = {
  id: string,
  name: string,
  artworkUrl?: string,
  artist: Artist,
};

export type Song = {
  id: string,
  duration: number,
  streamUrl: string,
  name: string,
  album: Album,
};

export type Edge<T> = {
  cursor: string,
  node: T,
};

export type Connection<T> = {
  count: number,
  edges: Edge<T>[],
};

export type PlaylistItem = {
  id: string,
  song: Song,
};

export type Playlist = {
  id: string,
  name: string,
  duration: number,
  items: Connection<PlaylistItem>,
};

const SONGS: { [string]: Song } = {
  a: {
    id: 'a',
    duration: 3 * 60 + 43,
    streamUrl: '/music/01 - Stole the Show (feat. Parson James).flac',
    name: 'Stole the Show',
    album: {
      id: '1',
      name: 'Stole the Show',
      artworkUrl:
        'https://i.scdn.co/image/d345ab2a8278434f1c8cc936ace70da02ac845fb',
      artist: {
        id: '1',
        name: 'Kygo',
      },
    },
  },
  b: {
    id: 'b',
    duration: 3 * 60 + 31,
    streamUrl:
      "/music/01 - I'm That... (Remix) [feat. Beenie Man & Azealia Banks].m4a",
    name: "I'm That (Remix)",
    album: {
      id: '1',
      name: "I'm That (Remix)",
      artworkUrl:
        'http://is4.mzstatic.com/image/thumb/Music5/v4/08/da/96/08da9619-3f9b-7c95-60d1-6c18cfdd4dbd/source/600x600bb.jpg',
      artist: {
        id: '1',
        name: 'R. City',
      },
    },
  },
  c: {
    id: 'c',
    duration: 4 * 60 + 30,
    streamUrl: '/music/01 - Bugatti (feat. Future & Rick Ross).flac',
    name: 'Bugatti',
    album: {
      id: '1',
      name: 'Bugatti',
      artworkUrl:
        'https://upload.wikimedia.org/wikipedia/en/3/3f/AceHood_Bugatti.jpg',
      artist: {
        id: '1',
        name: 'Ace Hood',
      },
    },
  },
};

store.dispatch(addToQueue(['a', 'b', 'c'], 'END'));

export default SONGS;
