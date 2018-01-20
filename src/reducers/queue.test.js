// @flow
import {
  addItemsToQueue,
  replaceQueue,
  skipRelative,
  removeFromQueue,
  skip,
  setPlayback,
  skipToPosition,
  togglePlayback,
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
  const items = [
    { songId: 'this is a song' },
    { songId: 'this is another song' },
  ];

  it('adds to end of queue', () => {
    const action = {
      type: 'ADD_ITEMS_TO_QUEUE',
      items,
      position: 'END',
    };
    const newState = addItemsToQueue(initialState, action);
    expect(newState).toMatchSnapshot();
  });

  it('adds after current playing item', () => {
    const action = {
      type: 'ADD_ITEMS_TO_QUEUE',
      items,
      position: 'AFTER_CURRENT',
    };
    const newState = addItemsToQueue(initialState, action);
    expect(newState).toMatchSnapshot();
  });

  it('adds before current playing item', () => {
    const action = {
      type: 'ADD_ITEMS_TO_QUEUE',
      items,
      position: 'BEFORE_CURRENT',
    };
    const newState = addItemsToQueue(initialState, action);
    expect(newState).toMatchSnapshot();
  });
});

describe('replace reducer', () => {
  it('replaces the queue', () => {
    const action = {
      type: 'REPLACE_QUEUE',
      items: [{ songId: 'Just The Way You Are' }, { songId: 'Glad You Came' }],
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

describe('skip to absolute position', () => {
  it('skips to a position', () => {
    const action = {
      type: 'SKIP_TO_POSITION',
      position: 1,
    };

    const newState = skipToPosition(initialState, action);
    expect(newState.position).toEqual(1);
  });
});

describe('set playback reducer', () => {
  it('sets playing to true', () => {
    const action = { type: 'SET_PLAYBACK', playing: true };
    const newState = setPlayback(initialState, action);
    expect(newState).toEqual({ ...initialState, shouldBePlaying: true });
  });
});

describe('toggle playback reducer', () => {
  it('changes from paused to playing', () => {
    const action = { type: 'TOGGLE_PLAYBACK' };
    const newState = togglePlayback(initialState, action);
    expect(newState.shouldBePlaying).toEqual(true);
  });

  it('changes from playing to paused', () => {
    const localState = { ...initialState, shouldBePlaying: true };
    const action = { type: 'TOGGLE_PLAYBACK' };
    const newState = togglePlayback(localState, action);
    expect(newState.shouldBePlaying).toEqual(false);
  });
});
