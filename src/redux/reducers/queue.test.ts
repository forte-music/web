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

import {
  AddItemsToQueueAction,
  RemoveFromQueueAction,
  ReplaceQueueAction,
  SetPlaybackAction,
  SkipAction,
  SkipPositionAction,
  SkipRelativeAction,
} from '../actions';
import { emptyPlayingFrom } from '../../utils/populateQueue';

const initialState = {
  items: [
    { id: 'a', songId: 'Legend', playingFrom: emptyPlayingFrom },
    {
      id: 'b',
      songId: 'Blessings (Explicit) ft. Drake, Kanye West',
      playingFrom: emptyPlayingFrom,
    },
    {
      id: 'c',
      songId: 'Pick Me Up ft. Anna of the North',
      playingFrom: emptyPlayingFrom,
    },
    { id: 'd', songId: 'No Less', playingFrom: emptyPlayingFrom },
    {
      id: 'e',
      songId: 'Love Is Gone (Audio) ft. Drew Love (of THEY.)',
      playingFrom: emptyPlayingFrom,
    },
  ],
  position: 2,
  isPlaying: false,
};

describe('add to queue reducer', () => {
  const items = [
    { songId: 'this is a song', playingFrom: emptyPlayingFrom },
    { songId: 'this is another song', playingFrom: emptyPlayingFrom },
  ];

  it('adds to end of queue', () => {
    const action: AddItemsToQueueAction = {
      type: 'ADD_ITEMS_TO_QUEUE',
      items,
      position: 'END',
    };
    const newState = addItemsToQueue(initialState, action);
    expect(newState).toMatchSnapshot();
  });

  it('adds after current playing item', () => {
    const action: AddItemsToQueueAction = {
      type: 'ADD_ITEMS_TO_QUEUE',
      items,
      position: 'AFTER_CURRENT',
    };
    const newState = addItemsToQueue(initialState, action);
    expect(newState).toMatchSnapshot();
  });

  it('adds before current playing item', () => {
    const action: AddItemsToQueueAction = {
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
    const action: ReplaceQueueAction = {
      type: 'REPLACE_QUEUE',
      items: [
        { songId: 'Just The Way You Are', playingFrom: emptyPlayingFrom },
        { songId: 'Glad You Came', playingFrom: emptyPlayingFrom },
      ],
    };
    const newState = replaceQueue(initialState, action);
    expect(newState).toMatchSnapshot();
  });
});

describe('skip relative reducer', () => {
  it('skips forward one', () => {
    const action: SkipRelativeAction = {
      type: 'SKIP_RELATIVE',
      offset: 1,
    };
    const newState = skipRelative(initialState, action);
    expect(newState.position).toBe(initialState.position + 1);
  });

  it('skips backwards one', () => {
    const action: SkipRelativeAction = {
      type: 'SKIP_RELATIVE',
      offset: -1,
    };
    const newState = skipRelative(initialState, action);
    expect(newState.position).toBe(initialState.position - 1);
  });

  it('stays within upper bound', () => {
    const action: SkipRelativeAction = {
      type: 'SKIP_RELATIVE',
      offset: 10,
    };
    const newState = skipRelative(initialState, action);
    expect(newState.position).toBe(initialState.items.length);
  });
});

describe('remove reducer', () => {
  it('removes songs after the current playing song', () => {
    const action: RemoveFromQueueAction = {
      type: 'REMOVE_FROM_QUEUE',
      songs: ['d', 'e'],
    };
    const newState = removeFromQueue(initialState, action);
    expect(newState).toMatchSnapshot();
  });

  it('removes songs before the current playing song', () => {
    const action: RemoveFromQueueAction = {
      type: 'REMOVE_FROM_QUEUE',
      songs: ['a', 'b'],
    };
    const newState = removeFromQueue(initialState, action);
    expect(newState).toMatchSnapshot();
  });

  it('removes the currently playing song', () => {
    const action: RemoveFromQueueAction = {
      type: 'REMOVE_FROM_QUEUE',
      songs: ['c'],
    };
    const newState = removeFromQueue(initialState, action);
    expect(newState).toMatchSnapshot();
  });
});

describe('skip reducer', () => {
  it('skips to a song', () => {
    const action: SkipAction = {
      type: 'SKIP_TO',
      cursor: 'd',
    };
    const newState = skip(initialState, action);
    expect(newState.position).toBe(3);
  });

  it("doesn't skip to an invalid song", () => {
    const action: SkipAction = {
      type: 'SKIP_TO',
      cursor: 'invalid',
    };
    const newState = skip(initialState, action);
    expect(newState).toEqual(initialState);
  });
});

describe('skip to absolute position', () => {
  it('skips to a position', () => {
    const action: SkipPositionAction = {
      type: 'SKIP_TO_POSITION',
      position: 1,
    };

    const newState = skipToPosition(initialState, action);
    expect(newState.position).toEqual(1);
  });
});

describe('set playback reducer', () => {
  it('sets playing to true', () => {
    const action: SetPlaybackAction = { type: 'SET_PLAYBACK', playing: true };
    const newState = setPlayback(initialState, action);
    expect(newState).toEqual({ ...initialState, isPlaying: true });
  });
});

describe('toggle playback reducer', () => {
  it('changes from paused to playing', () => {
    const newState = togglePlayback(initialState);
    expect(newState.isPlaying).toEqual(true);
  });

  it('changes from playing to paused', () => {
    const localState = { ...initialState, isPlaying: true };
    const newState = togglePlayback(localState);
    expect(newState.isPlaying).toEqual(false);
  });
});
