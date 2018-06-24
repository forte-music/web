import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { Props } from '..';
import { QueueItemSource } from '../../../state/queue';
import { State } from '../../../state';
import { PlaybackState } from '../../../components/PlaybackArtwork';
import { play, pause } from '../../../actions';
import {
  isSource,
  nowPlaying as nowPlayingSelector,
} from '../../../selectors/nowPlaying';
import { playList } from '../../../actions/creators/queue';
import { Action } from '../../../actions';

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

      playList(dispatch)(itemsWithDefaults);
    },
  })
);

export default reduxEnhancer;
