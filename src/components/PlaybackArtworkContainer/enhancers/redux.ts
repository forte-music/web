import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { QueueItemSource, Kind } from '../../../redux/state/queue';
import { State } from '../../../redux/state';
import { PlaybackState } from '../../PlaybackArtwork';
import { play, pause, Action } from '../../../redux/actions';
import {
  isSource,
  nowPlaying as nowPlayingSelector,
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
  kind: Kind;
  list: string;
  tracks: QueueItemSource[];
}

interface ChildProps extends StateEnhancedProps, ActionEnhancedProps {}

interface EnhancedProps extends ChildProps, OwnProps {}

type ChildrenFn = (props: ChildProps) => React.ReactElement<any> | null;

const enhancer = connect<
  StateEnhancedProps,
  ActionEnhancedProps,
  OwnProps,
  EnhancedProps,
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
