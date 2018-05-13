// @flow
import { connect } from 'react-redux';
import type { Dispatch } from 'redux';

import type { State } from '../../state';
import type { QueueItem } from '../../state/queue';
import { nowPlaying as nowPlayingSelector } from '../../selectors/nowPlaying';

import Queue from './Queue';
import { skipToPosition } from '../../actions';
import type { Action } from '../../actions';

type StateEnhancedProps = {
  items: QueueItem[],
  nowPlaying: ?QueueItem,
};

type ActionEnhancedProps = {
  skipToPosition: number => void,
};

export type EnhancedProps = StateEnhancedProps & ActionEnhancedProps;

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
