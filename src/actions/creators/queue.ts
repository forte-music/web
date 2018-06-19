import { Dispatch } from 'redux';
import { State } from '../../state';
import { replaceQueue, skipToPosition, play } from '../queue';
import { QueueItemSource } from '../../state/queue';

// Enqueues and plays a list of items starting at the specified index.
export const playList = (dispatch: Dispatch<State>) => (
  items: QueueItemSource[],
  startAtIndex: number = 0
) => {
  dispatch(replaceQueue(items));
  if (startAtIndex) {
    dispatch(skipToPosition(startAtIndex));
  }

  dispatch(play());
};
