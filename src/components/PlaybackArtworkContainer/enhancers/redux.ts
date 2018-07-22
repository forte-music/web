import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { Kind, QueueItemSource, QueueState } from '../../../redux/state/queue';
import { State } from '../../../redux/state';
import { PlaybackState } from '../../PlaybackArtwork';
import { Action, pause, play } from '../../../redux/actions';
import { getActiveQueueItemForList } from '../../../redux/selectors/nowPlaying';
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

const getPlayingState = (
  queue: QueueState,
  kind: Kind,
  listId: string
): PlaybackState => {
  const activeQueueItem = getActiveQueueItemForList(queue, kind, listId);
  if (!activeQueueItem) {
    return 'STOPPED';
  }

  if (queue.shouldBePlaying) {
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
  ({ queue }, { kind, list }) => ({
    state: getPlayingState(queue, kind, list),
  }),
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
