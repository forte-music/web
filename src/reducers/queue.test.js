// @flow
import {
  addToQueue,
  replaceQueue,
  skipRelative,
  removeFromQueue,
  skip,
  setPlayback,
} from './queue';

const initialState = {
  items: [
    { id: 'a', songId: 'Legend' },
    { id: 'b', songId: 'Blessings (Explicit) ft. Drake, Kanye West' },
    { id: 'c', songId: 'Pick Me Up ft. Anna of the North' },
    { id: 'd', songId: 'No Less' },
    { id: 'e', songId: 'Love Is Gone (Audio) ft. Drew Love (of THEY.)' },
  ],
  position: 2,
  shouldBePlaying: false,
};

describe('add to queue reducer', () => {
  const songs = ['this is a song', 'this is another song'];

  it('adds to end of queue', () => {
    const action = {
      type: 'ADD_TO_QUEUE',
      songs,
      position: 'END',
    };
    const newState = addToQueue(initialState, action);
    expect(newState).toMatchSnapshot();
  });

  it('adds after current playing item', () => {
    const action = {
      type: 'ADD_TO_QUEUE',
      songs,
      position: 'AFTER_CURRENT',
    };
    const newState = addToQueue(initialState, action);
    expect(newState).toMatchSnapshot();
  });
});

describe('replace reducer', () => {
  it('replaces the queue', () => {
    const action = {
      type: 'REPLACE_QUEUE',
      songs: ['Just The Way You Are', 'Glad You Came'],
    };
    const newState = replaceQueue(initialState, action);
    expect(newState).toMatchSnapshot();
  });
});

describe('skip relative reducer', () => {
  it('skips forward one', () => {
    const action = {
      type: 'SKIP_RELATIVE',
      offset: 1,
    };
    const newState = skipRelative(initialState, action);
    expect(newState.position).toBe(initialState.position + 1);
  });

  it('skips backwards one', () => {
    const action = {
      type: 'SKIP_RELATIVE',
      offset: -1,
    };
    const newState = skipRelative(initialState, action);
    expect(newState.position).toBe(initialState.position - 1);
  });

  it('stays within upper bound', () => {
    const action = {
      type: 'SKIP_RELATIVE',
      offset: 10,
    };
    const newState = skipRelative(initialState, action);
    expect(newState.position).toBe(initialState.items.length);
  });
});

describe('remove reducer', () => {
  it('removes songs after the current playing song', () => {
    const action = {
      type: 'REMOVE_FROM_QUEUE',
      songs: ['d', 'e'],
    };
    const newState = removeFromQueue(initialState, action);
    expect(newState).toMatchSnapshot();
  });

  it('removes songs before the current playing song', () => {
    const action = {
      type: 'REMOVE_FROM_QUEUE',
      songs: ['a', 'b'],
    };
    const newState = removeFromQueue(initialState, action);
    expect(newState).toMatchSnapshot();
  });

  it('removes the currently playing song', () => {
    const action = {
      type: 'REMOVE_FROM_QUEUE',
      songs: ['c'],
    };
    const newState = removeFromQueue(initialState, action);
    expect(newState).toMatchSnapshot();
  });
});

describe('skip reducer', () => {
  it('skips to a song', () => {
    const action = {
      type: 'SKIP_TO',
      cursor: 'd',
    };
    const newState = skip(initialState, action);
    expect(newState.position).toBe(3);
  });

  it("doesn't skip to an invalid song", () => {
    const action = {
      type: 'SKIP_TO',
      cursor: 'invalid',
    };
    const newState = skip(initialState, action);
    expect(newState).toEqual(initialState);
  });
});

describe('set playback reducer', () => {
  it('sets playing to true', () => {
    const action = { type: 'SET_PLAYBACK', playing: true };
    const newState = setPlayback(initialState, action);
    expect(newState).toEqual({ ...initialState, shouldBePlaying: true });
  });
});
