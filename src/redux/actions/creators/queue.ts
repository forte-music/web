import { Dispatch } from 'redux';
import { replaceQueue, skipToPosition, play } from '../queue';
import { QueueItemSource } from '../../state/queue';
import { Action } from '..';

// Enqueues and plays a list of items starting at the specified index.
export const startPlayingList = (dispatch: Dispatch<Action>) => (
  items: QueueItemSource[],
  startAtIndex: number = 0
) => {
  dispatch(replaceQueue(items));
  if (startAtIndex) {
    dispatch(skipToPosition(startAtIndex));
  }

  dispatch(play());
};
