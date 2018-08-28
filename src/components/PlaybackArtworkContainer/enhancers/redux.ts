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
  getTracks: () => Promise<QueueItemSource[]>;

  isLoading: boolean;
  setLoading: (newLoading: boolean) => void;
}

const getPlayingState = (
  queue: QueueState,
  isLoading: boolean,
  checkPlaying: CheckPlayingFromFn
): PlaybackState => {
  if (isLoading) {
    return 'LOADING';
  }

  const activeQueueItem = getPlayingMatching(queue, checkPlaying);
  if (!activeQueueItem) {
    return 'STOPPED';
  }

  if (queue.isPlaying) {
    return 'PLAYING';
  }

  return 'PAUSED';
};

export const PlaybackArtworkReduxState = createReduxComponent<
  State,
  StateEnhancedProps,
  ActionEnhancedProps,
  OwnProps
>(
  (state, props) => ({
    state: getPlayingState(
      state.queue,
      props.isLoading,
      props.checkPlayingFrom
    ),
  }),
  (dispatch: Dispatch<Action>, props) => ({
    onPlaying: () => dispatch(play()),
    onPaused: () => dispatch(pause()),
    onStartPlayback: async () => {
      const tracks = await withLoading(props.setLoading, props.getTracks);
      startPlayingList(dispatch)(tracks);
    },
  })
);

const withLoading = async <T>(
  setLoading: (isLoading: boolean) => void,
  action: () => Promise<T>
): Promise<T> => {
  try {
    setLoading(true);
    return await action();
  } finally {
    setLoading(false);
  }
};
