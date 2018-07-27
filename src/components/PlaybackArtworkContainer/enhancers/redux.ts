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
import { createReduxComponent } from '../../../redux/render';

interface StateEnhancedProps {
  state: PlaybackState;
}

interface ActionEnhancedProps {
  onPlaying: () => void;
  onPaused: () => void;
  onStartPlayback: () => void;
}

interface OwnProps {
  checkPlayingFrom: CheckPlayingFromFn;
  tracks: QueueItemSource[];
}

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

export const PlaybackArtworkState = createReduxComponent<
  State,
  StateEnhancedProps,
  ActionEnhancedProps,
  OwnProps
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
  })
);
