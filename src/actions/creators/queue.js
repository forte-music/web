// @flow
import { replaceQueue, skipToPosition, play } from '../queue';
import type { QueueItemSource } from '../../state/queue';
import type { Dispatch } from '../../store';

// Enqueues and plays a list of items starting at the specified index.
export const playList = (dispatch: Dispatch) => (
  items: QueueItemSource[],
  startAtIndex: number = 0
) => {
  dispatch(replaceQueue(items));
  if (startAtIndex) {
    dispatch(skipToPosition(startAtIndex));
  }

  dispatch(play());
};
