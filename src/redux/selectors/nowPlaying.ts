import { Kind, QueueItem, QueueState, Source } from '../state/queue';

export const nowPlaying = ({
  items,
  position,
}: QueueState): QueueItem | undefined => items[position];

// Checks whether the list of kind with identifier list is the same as source.
export const isSource = (
  { kind: sourceKind, list: sourceList }: Source,
  kind: Kind,
  list: string
): boolean => sourceKind === kind && sourceList === list;

// Returns true when the currently playing item in the queue (nowPlaying)
// has the kind and listId specified.
export const isSourceActive = (
  queue: QueueState,
  kind: Kind,
  listId: string
): boolean => {
  const source = nowPlaying(queue);
  if (!source) {
    // Nothing is playing.
    return false;
  }

  return isSource(source, kind, listId);
};
