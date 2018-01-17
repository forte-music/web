// @flow
import type { QueueState, QueueItem, Kind, Source } from '../state/queue';

export const nowPlaying = ({ items, position }: QueueState): ?QueueItem =>
  items[position];

// Checks whether the list of kind with identifier list is the same as source.
export const isSource = (
  { kind: sourceKind, list: sourceList }: Source,
  kind: Kind,
  list: string
): boolean => sourceKind === kind && sourceList === list;

export const isSameSource = (
  { kind: kindA, list: listA, song: songA }: Source,
  { kind: kindB, list: listB, song: songB }: Source
): boolean => kindA === kindB && listA === listB && songA === songB;
