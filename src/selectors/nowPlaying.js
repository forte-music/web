// @flow
import type { QueueState, QueueItem, Kind, Source } from '../state/queue';

export const nowPlaying = ({ items, position }: QueueState): ?QueueItem =>
  items[position];

// Checks whether the list of kind with identifier list is the same as source.
export const isSource = (
  source: ?Source,
  kind: Kind,
  list: string
): boolean => {
  const { kind: sourceKind, list: sourceList } = source || {};
  return sourceKind === kind && sourceList === list;
};
