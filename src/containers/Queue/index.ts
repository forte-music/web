import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { State } from '../../state';
import { QueueItem } from '../../state/queue';
import { nowPlaying as nowPlayingSelector } from '../../selectors/nowPlaying';

import Queue from './Queue';
import { skipToPosition } from '../../actions';
import { Action } from '../../actions';

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

const reduxEnhancer = connect(
  ({ queue }: State): StateEnhancedProps => {
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

const EnhancedComponent = reduxEnhancer(Queue);

export default EnhancedComponent;
