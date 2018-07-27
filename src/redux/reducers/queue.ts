import {
  QueueItem,
  QueueItemSource,
  QueueState,
  initialState,
  getId,
} from '../state/queue';
import {
  Action,
  SetPlaybackAction,
  SkipPositionAction,
  AddItemsToQueueAction,
  RemoveFromQueueAction,
  SkipRelativeAction,
  SkipAction,
  ReplaceQueueAction,
} from '../actions';

const reducer = (
  state: QueueState = initialState,
  action: Action
): QueueState => {
  switch (action.type) {
    case 'ADD_ITEMS_TO_QUEUE':
      return addItemsToQueue(state, action);

    case 'REMOVE_FROM_QUEUE':
      return removeFromQueue(state, action);

    case 'SKIP_RELATIVE':
      return skipRelative(state, action);

    case 'SKIP_TO':
      return skip(state, action);

    case 'SKIP_TO_POSITION':
      return skipToPosition(state, action);

    case 'REPLACE_QUEUE':
      return replaceQueue(state, action);

    case 'SET_PLAYBACK':
      return setPlayback(state, action);

    case 'TOGGLE_PLAYBACK':
      return togglePlayback(state);
  }

  return state;
};

export const addItemsToQueue = (
  state: QueueState,
  action: AddItemsToQueueAction
): QueueState => {
  const { items: sourceItemsToAdd, position } = action;

  const itemsToAdd = sourceItemsToAdd.map((sourceItem: QueueItemSource) => ({
    ...sourceItem,
    id: getId(),
  }));

  const { items: oldItems } = state;

  let idx;
  if (position === 'END') {
    idx = oldItems.length;
  } else if (position === 'AFTER_CURRENT') {
    const { position: positionIdx } = state;
    idx = positionIdx + 1;
  } else if (position === 'BEFORE_CURRENT') {
    const { position: positionIdx } = state;
    idx = positionIdx - 1;
  }

  const items = [
    ...oldItems.slice(0, idx),
    ...itemsToAdd,
    ...oldItems.slice(idx),
  ];

  return { ...state, items };
};

export const replaceQueue = (
  state: QueueState,
  action: ReplaceQueueAction
): QueueState => {
  const { items: sourceItemsToAdd } = action;
  const items: QueueItem[] = sourceItemsToAdd.map(sourceItem => ({
    ...sourceItem,
    id: getId(),
  }));

  return {
    ...state,
    items,
    position: 0,
  };
};

export const removeFromQueue = (
  state: QueueState,
  action: RemoveFromQueueAction
): QueueState => {
  const { songs: toRemove } = action;
  const { items: oldItems, position: oldPosition } = state;

  const { items, position } = oldItems.reduce(
    ({ items, position, removed }, oldItem, idx) => {
      const { id } = oldItem;
      if (!toRemove.includes(id)) {
        // keeping item
        return { items: [...items, oldItem], position, removed };
      } else {
        if (idx - removed < position) {
          // update position when removal will affect position
          position--;
        }

        return { items, position, removed: removed + 1 };
      }
    },
    { items: [] as QueueItem[], position: oldPosition, removed: 0 }
  );

  return { ...state, items, position };
};

export const skipRelative = (
  state: QueueState,
  action: SkipRelativeAction
): QueueState => {
  const { offset } = action;
  const { position, items } = state;

  const newPosition = bounded(position + offset, 0, items.length);
  return { ...state, position: newPosition };
};

export const skip = (state: QueueState, action: SkipAction): QueueState => {
  const { cursor } = action;
  const { position: oldPosition, items } = state;

  const foundIndex = items.findIndex(({ id }) => id === cursor);
  const position = foundIndex === -1 ? oldPosition : foundIndex;
  return { ...state, position };
};

export const skipToPosition = (
  state: QueueState,
  action: SkipPositionAction
): QueueState => {
  const { position } = action;
  const { items } = state;
  const newPosition = bounded(position, 0, items.length);

  return { ...state, position: newPosition };
};

export const setPlayback = (
  state: QueueState,
  action: SetPlaybackAction
): QueueState => {
  const { playing } = action;

  return { ...state, isPlaying: playing };
};

export const togglePlayback = (state: QueueState): QueueState => {
  return { ...state, isPlaying: !state.isPlaying };
};

const bounded = (num: number, lower: number, upper: number): number => {
  if (num > upper) {
    return upper;
  }

  if (num < lower) {
    return lower;
  }

  return num;
};

export default reducer;
