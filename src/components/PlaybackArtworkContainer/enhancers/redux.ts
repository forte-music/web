import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { Props } from '..';
import { QueueItemSource } from '../../../redux/state/queue';
import { State } from '../../../redux/state';
import { PlaybackState } from '../../PlaybackArtwork';
import { play, pause, Action } from '../../../redux/actions';
import {
  isSource,
  nowPlaying as nowPlayingSelector,
} from '../../../redux/selectors/nowPlaying';
import { startPlayingList } from '../../../redux/actions/creators/queue';

export interface ReduxStateEnhancedProps {
  state: PlaybackState;
}

export interface ReduxActionEnhancedProps {
  onPlaying: () => void;
  onPaused: () => void;
  onStartPlayback: () => void;
}

const reduxEnhancer = connect<
  ReduxStateEnhancedProps,
  ReduxActionEnhancedProps,
  Props,
  State
>(
  ({ queue }, { kind, list }) => {
    const { source = {} } = nowPlayingSelector(queue) || {};

    const nowPlaying = isSource(source, kind, list);

    return {
      state: nowPlaying
        ? queue.shouldBePlaying ? 'PLAYING' : 'PAUSED'
        : 'STOPPED',
    };
  },
  (dispatch: Dispatch<Action>, { tracks, list, kind }) => ({
    onPlaying: () => dispatch(play()),
    onPaused: () => dispatch(pause()),
    onStartPlayback: async () => {
      const itemsWithDefaults: QueueItemSource[] = tracks.map(item => ({
        ...item,
        source: { list, kind, ...item.source },
      }));

      startPlayingList(dispatch)(itemsWithDefaults);
    },
  })
);

export default reduxEnhancer;
