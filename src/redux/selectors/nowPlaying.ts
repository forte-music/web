import { Kind, QueueItem, QueueState, Source } from '../state/queue';

export const nowPlaying = ({
  items,
  position,
}: QueueState): QueueItem | undefined => items[position];

// Checks whether the list of kind with identifier list is the same as source.
export const isSource = (source: Source, kind: Kind, list?: string): boolean =>
  source.kind === kind && source.list === list;

// Gets the QueueItem of the currently playing item if it has the kind and
// list id specified. Otherwise returns void signifying that the list isn't
// currently playing.
export const getActiveQueueItemForList = (
  queue: QueueState,
  kind: Kind,
  listId?: string
): QueueItem | void => {
  const queueItem = nowPlaying(queue);
  if (!queueItem) {
    // Nothing is playing.
    return;
  }

  if (!queueItem.source) {
    // Something is playing but no information about its origin is attached
    // to it.
    return;
  }

  if (!isSource(queueItem.source, kind, listId)) {
    // There is something playing but it isn't from the provided list.
    return;
  }

  return queueItem;
};
