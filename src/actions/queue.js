// @flow
import type { ID, QueueItemSource } from '../state/queue';

type Position = 'END' | 'AFTER_CURRENT' | 'BEFORE_CURRENT';

export type AddItemsToQueueAction = {
  type: 'ADD_ITEMS_TO_QUEUE',
  items: QueueItemSource[],
  position: Position,
};

export const addToQueue = (
  items: QueueItemSource[],
  position: Position
): AddItemsToQueueAction => ({
  type: 'ADD_ITEMS_TO_QUEUE',
  items,
  position,
});

export const addItemsToQueue = (
  items: QueueItemSource[],
  position: Position
): AddItemsToQueueAction => ({ type: 'ADD_ITEMS_TO_QUEUE', items, position });

export type ReplaceQueueAction = {
  type: 'REPLACE_QUEUE',
  items: QueueItemSource[],
};

export const replaceQueue = (items: QueueItemSource[]): ReplaceQueueAction => ({
  type: 'REPLACE_QUEUE',
  items,
});

export type RemoveFromQueueAction = { type: 'REMOVE_FROM_QUEUE', songs: ID[] };

export const removeFromQueue = (songs: ID[]): RemoveFromQueueAction => ({
  type: 'REMOVE_FROM_QUEUE',
  songs,
});

export type SkipRelativeAction = { type: 'SKIP_RELATIVE', offset: number };

export const skipRelative = (offset: number): SkipRelativeAction => ({
  type: 'SKIP_RELATIVE',
  offset,
});

export const nextSong = (): SkipRelativeAction => ({
  type: 'SKIP_RELATIVE',
  offset: 1,
});

export const previousSong = (): SkipRelativeAction => ({
  type: 'SKIP_RELATIVE',
  offset: -1,
});

export type SkipPositionAction = { type: 'SKIP_TO_POSITION', position: number };

export const skipToPosition = (position: number) => ({
  type: 'SKIP_TO_POSITION',
  position,
});

export type SkipAction = { type: 'SKIP_TO', cursor: ID };

export const skipToSong = (cursor: ID): SkipAction => ({
  type: 'SKIP_TO',
  cursor,
});

export type SetPlaybackAction = { type: 'SET_PLAYBACK', playing: boolean };

export const play = (): SetPlaybackAction => ({
  type: 'SET_PLAYBACK',
  playing: true,
});
export const pause = (): SetPlaybackAction => ({
  type: 'SET_PLAYBACK',
  playing: false,
});

export type TogglePlaybackAction = { type: 'TOGGLE_PLAYBACK' };

export const togglePlayback = (): TogglePlaybackAction => ({
  type: 'TOGGLE_PLAYBACK',
});

export type QueueAction =
  | AddItemsToQueueAction
  | ReplaceQueueAction
  | RemoveFromQueueAction
  | SkipRelativeAction
  | SkipAction
  | SkipPositionAction
  | SetPlaybackAction
  | TogglePlaybackAction;
