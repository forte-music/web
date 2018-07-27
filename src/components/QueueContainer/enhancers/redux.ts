import { QueueItem } from '../../../redux/state/queue';
import { Dispatch } from 'redux';
import { State } from '../../../redux/state';
import { Action, skipToPosition } from '../../../redux/actions';
import { nowPlaying as nowPlayingSelector } from '../../../redux/selectors/nowPlaying';
import { createReduxComponent } from '../../../redux/render';

interface StateEnhancedProps {
  items: QueueItem[];
  nowPlayingId?: string;
}

interface ActionEnhancedProps {
  skipToPosition: (position: number) => void;
}

export const QueueState = createReduxComponent<
  State,
  StateEnhancedProps,
  ActionEnhancedProps
>(
  ({ queue }) => {
    const nowPlaying = nowPlayingSelector(queue);

    return { nowPlayingId: nowPlaying && nowPlaying.id, items: queue.items };
  },
  (dispatch: Dispatch<Action>): ActionEnhancedProps => ({
    skipToPosition: (position: number) => {
      dispatch(skipToPosition(position));
    },
  })
);
