import { QueueItem } from '../../../state/queue';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { State } from '../../../state';
import { Action, skipToPosition } from '../../../actions';
import { nowPlaying as nowPlayingSelector } from '../../../selectors/nowPlaying';

interface StateEnhancedProps {
  items: QueueItem[];
  nowPlaying?: QueueItem;
}

interface ActionEnhancedProps {
  skipToPosition: (position: number) => void;
}

export interface EnhancedProps
  extends StateEnhancedProps,
    ActionEnhancedProps {}

export const reduxEnhancer = connect<
  StateEnhancedProps,
  ActionEnhancedProps,
  {},
  State
>(
  ({ queue }) => {
    const nowPlaying = nowPlayingSelector(queue);
    const { items } = queue;

    return { nowPlaying, items };
  },
  (dispatch: Dispatch<Action>): ActionEnhancedProps => ({
    skipToPosition: (position: number) => {
      dispatch(skipToPosition(position));
    },
  })
);
