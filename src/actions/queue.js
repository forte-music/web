// @flow
import type { ID } from '../state/queue';

type Position = 'END' | 'AFTER_CURRENT';

export type AddToQueueAction = {
  type: 'ADD_TO_QUEUE',
  songs: string[],
  position: Position,
};

export const addToQueue = (
  songs: string[],
  position: Position
): AddToQueueAction => ({ type: 'ADD_TO_QUEUE', songs, position });

export type ReplaceQueueAction = { type: 'REPLACE_QUEUE', songs: string[] };

export const replaceQueue = (songs: string[]): ReplaceQueueAction => ({
  type: 'REPLACE_QUEUE',
  songs,
});

export type RemoveFromQueueAction = { type: 'REMOVE_FROM_QUEUE', songs: ID[] };

export const removeFromQueue = (songs: ID[]): RemoveFromQueueAction => ({
  type: 'REMOVE_FROM_QUEUE',
  songs,
});

export type SkipRelativeAction = { type: 'SKIP_RELATIVE', offset: number };

export const nextSong = (): SkipRelativeAction => ({
  type: 'SKIP_RELATIVE',
  offset: 1,
});

export const previousSong = (): SkipRelativeAction => ({
  type: 'SKIP_RELATIVE',
  offset: -1,
});

export type SkipAction = { type: 'SKIP_TO', cursor: ID };

export const skipToSong = (cursor: ID): SkipAction => ({
  type: 'SKIP_TO',
  cursor,
});

export type QueueAction =
  | AddToQueueAction
  | ReplaceQueueAction
  | RemoveFromQueueAction
  | SkipRelativeAction
  | SkipAction;
