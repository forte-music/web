import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { ReactNode } from 'react';

import { Kind, QueueItemSource } from '../../state/queue';
import { State } from '../../state';
import { PlaybackState } from '../../components/PlaybackArtwork';
import { play, pause } from '../../actions';
import {
  isSource,
  nowPlaying as nowPlayingSelector,
} from '../../selectors/nowPlaying';
import PlaybackArtwork from '../../components/PlaybackArtwork';
import { playList } from '../../actions/creators/queue';
import { Action } from '../../actions';

interface Props {
  // The kind of list this is. Used to check whether the current playing
  // item is from this list. This information also passed to onStartPlayback.
  kind: Kind;

  // The id of this list. Used to check whether the current playing item is
  // from this list. This information is also passed to onStartPlayback.
  list: string;

  // A list of tracks to enqueue when play is pressed.
  tracks: QueueItemSource[];

  // See components/PlaybackArtwork.js.
  backgroundInteraction?: boolean;

  children: ReactNode;
}

interface ReduxStateEnhancedProps {
  state: PlaybackState;
}

const reduxEnhancer = connect(
  ({ queue }: State, { kind, list }: Props): ReduxStateEnhancedProps => {
    const { source = {} } = nowPlayingSelector(queue) || {};

    const nowPlaying = isSource(source, kind, list);

    return {
      state: nowPlaying
        ? queue.shouldBePlaying ? 'PLAYING' : 'PAUSED'
        : 'STOPPED',
    };
  },
  (dispatch: Dispatch<Action>, { tracks, list, kind }: Props) => ({
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

// A connected playback artwork. It updates its state based on the current
// playing item and calls a prop when time to play more items.
const EnhancedComponent = reduxEnhancer(PlaybackArtwork);

export default EnhancedComponent;
