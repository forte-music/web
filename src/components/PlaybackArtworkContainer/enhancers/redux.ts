import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { QueueItemSource, QueueState } from '../../../redux/state/queue';
import { State } from '../../../redux/state';
import { PlaybackState } from '../../PlaybackArtwork';
import { Action, pause, play } from '../../../redux/actions';
import {
  CheckPlayingFromFn,
  getPlayingMatching,
} from '../../../redux/selectors/nowPlaying';
import { startPlayingList } from '../../../redux/actions/creators/queue';

interface StateEnhancedProps {
  state: PlaybackState;
}

interface ActionEnhancedProps {
  onPlaying: () => void;
  onPaused: () => void;
  onStartPlayback: () => void;
}

interface OwnProps {
  children: ChildrenFn;
  checkPlayingFrom: CheckPlayingFromFn;
  tracks: QueueItemSource[];
}

interface ChildProps extends StateEnhancedProps, ActionEnhancedProps {}

interface EnhancedProps extends ChildProps, OwnProps {}

type ChildrenFn = (props: ChildProps) => React.ReactElement<any> | null;

const getPlayingState = (
  queue: QueueState,
  checkPlaying: CheckPlayingFromFn
): PlaybackState => {
  const activeQueueItem = getPlayingMatching(queue, checkPlaying);
  if (!activeQueueItem) {
    return 'STOPPED';
  }

  if (queue.isPlaying) {
    return 'PLAYING';
  }

  return 'PAUSED';
};

const enhancer = connect<
  StateEnhancedProps,
  ActionEnhancedProps,
  OwnProps,
  EnhancedProps,
  State
>(
  (state, props) => ({
    state: getPlayingState(state.queue, props.checkPlayingFrom),
  }),
  (dispatch: Dispatch<Action>, props) => ({
    onPlaying: () => dispatch(play()),
    onPaused: () => dispatch(pause()),
    onStartPlayback: async () => {
      startPlayingList(dispatch)(props.tracks);
    },
  }),
  (
    stateProps: StateEnhancedProps,
    actionProps: ActionEnhancedProps,
    ownProps: OwnProps
  ) => ({
    ...stateProps,
    ...actionProps,
    ...ownProps,
  })
);

const Component = ({ children, ...props }: EnhancedProps) => children(props);

export const PlaybackArtworkState = enhancer(Component);
