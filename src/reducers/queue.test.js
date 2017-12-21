import {
  addToQueue, replaceQueue, skipRelative, removeFromQueue, skip,
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
};

describe('add to queue reducer', () => {
  const songs = [ 'this is a song', 'this is another song' ];

  it('adds to end of queue', () => {
    const action = {
      songs,
      position: 'END',
    };
    const newState = addToQueue(initialState, action)
    expect(newState).toMatchSnapshot();
  });

  it('adds after current playing item', () => {
    const action = {
      songs,
      position: 'AFTER_CURRENT',
    };
    const newState = addToQueue(initialState, action)
    expect(newState).toMatchSnapshot();
  });
});

describe('replace reducer', () => {
  it('replaces the queue', () => {
    const action = { songs: [ 'Just The Way You Are', 'Glad You Came' ] };
    const newState = replaceQueue(initialState, action);
    expect(newState).toMatchSnapshot();
  });
});

describe('skip relative reducer', () => {
  it('skips forward one', () => {
    const action = { offset: 1 };
    const newState = skipRelative(initialState, action);
    expect(newState.position).toBe(initialState.position + 1);
  });

  it('skips backwards one', () => {
    const action = { offset: -1 };
    const newState = skipRelative(initialState, action);
    expect(newState.position).toBe(initialState.position - 1);
  });

  it('stays within upper bound', () => {
    const action = { offset: 10 };
    const newState = skipRelative(initialState, action);
    expect(newState.position).toBe(initialState.items.length);
  });
});

describe('remove reducer', () => {
  it('removes songs after the current playing song', () => {
    const action = { songs: [ 'd', 'e' ] };
    const newState = removeFromQueue(initialState, action);
    expect(newState).toMatchSnapshot();
  });

  it('removes songs before the current playing song', () => {
    const action = { songs: [ 'a', 'b' ] };
    const newState = removeFromQueue(initialState, action);
    expect(newState).toMatchSnapshot();
  });

  it('removes the currently playing song', () => {
    const action = { songs: [ 'c' ] };
    const newState = removeFromQueue(initialState, action);
    expect(newState).toMatchSnapshot();
  });
});

describe('skip reducer', () => {
  it('skips to a song', () => {
    const action = { cursor: 'd' };
    const newState = skip(initialState, action);
    expect(newState.position).toBe(3);
  });

  it("doesn't skip to an invalid song", () => {
    const action = { cursor: 'invalid' };
    const newState = skip(initialState, action);
    expect(newState).toEqual(initialState);
  });
});
