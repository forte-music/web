import { Dispatch, bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { State } from '../../../redux/state';
import { QueueItem } from '../../../redux/state/queue';
import {
  Action,
  nextSong,
  pause,
  play,
  previousSong,
} from '../../../redux/actions';
import { nowPlaying as nowPlayingSelector } from '../../../redux/selectors/nowPlaying';

interface StateEnhancedProps {
  // The currently playing queue item. Undefined if nothing is playing.
  queueItem?: QueueItem;

  // Whether or not audio should be playing.
  playing: boolean;
}

const mapStateToProps = ({ queue }: State): StateEnhancedProps => ({
  queueItem: nowPlayingSelector(queue),
  playing: queue.shouldBePlaying,
});

interface DispatchProps {
  // Called to skip to the next song in the queue.
  nextSong: () => void;

  // Called to skip to the previous song in the queue.
  previousSong: () => void;

  // Called to start playback.
  play: () => void;

  // Called to temporarily stop playback.
  pause: () => void;
}

const mapDispatchToProps = (dispatch: Dispatch<Action>): DispatchProps =>
  bindActionCreators({ nextSong, previousSong, play, pause }, dispatch);

interface OwnProps {
  children: ChildrenFn;
}

interface ChildProps extends DispatchProps, StateEnhancedProps {}

interface EnhancedProps extends ChildProps, OwnProps {}

type ChildrenFn = (props: ChildProps) => React.ReactElement<any> | null;

const enhancer = connect<
  StateEnhancedProps,
  DispatchProps,
  OwnProps,
  EnhancedProps,
  State
>(
  mapStateToProps,
  mapDispatchToProps,
  (
    stateProps: StateEnhancedProps,
    dispatchProps: DispatchProps,
    ownProps: OwnProps
  ) => ({ ...stateProps, ...dispatchProps, ...ownProps })
);

const Component: React.StatelessComponent<EnhancedProps> = ({
  children,
  ...props
}: EnhancedProps) => children(props);

export const FooterState: React.ComponentType<OwnProps> = enhancer(Component);
