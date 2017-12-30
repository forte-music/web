// @flow
import { addToQueue } from './actions/queue';
import store from './store';

// Some mock data and types used for testing. This will be replaced with graphql
// and generated types using apollo-codegen.

export type Artist = {
  name: string,
};

export type Album = {
  name: string,
  artworkUrl: string,
  artist: Artist,
};

export type Song = {
  streamUrl: string,
  name: string,
  album: Album,
};

const SONGS: { [string]: Song } = {
  a: {
    streamUrl: '/music/01 - Stole the Show (feat. Parson James).flac',
    name: 'Stole the Show',
    album: {
      name: 'Stole the Show',
      artworkUrl:
        'https://i.scdn.co/image/d345ab2a8278434f1c8cc936ace70da02ac845fb',
      artist: {
        name: 'Kygo',
      },
    },
  },
  b: {
    streamUrl:
      "/music/01 - I'm That... (Remix) [feat. Beenie Man & Azealia Banks].m4a",
    name: "I'm That (Remix)",
    album: {
      name: "I'm That (Remix)",
      artworkUrl:
        'http://is4.mzstatic.com/image/thumb/Music5/v4/08/da/96/08da9619-3f9b-7c95-60d1-6c18cfdd4dbd/source/600x600bb.jpg',
      artist: {
        name: 'R. City',
      },
    },
  },
  c: {
    streamUrl: '/music/01 - Bugatti (feat. Future & Rick Ross).flac',
    name: 'Bugatti',
    album: {
      name: 'Bugatti',
      artworkUrl:
        'https://upload.wikimedia.org/wikipedia/en/3/3f/AceHood_Bugatti.jpg',
      artist: {
        name: 'Ace Hood',
      },
    },
  },
};

store.dispatch(addToQueue(['a', 'b', 'c'], 'END'));

export default SONGS;
