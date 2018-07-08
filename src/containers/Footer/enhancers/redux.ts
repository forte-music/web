import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { InputProps } from '..';
import { State as ReduxState } from '../../../redux/state/index';
import { QueueItem } from '../../../redux/state/queue';
import {
  Action,
  SetPlaybackAction,
  SkipRelativeAction,
} from '../../../redux/actions';
import { nowPlaying as nowPlayingSelector } from '../../../redux/selectors/nowPlaying';
import { nextSong, pause, play, previousSong } from '../../../redux/actions';

export interface ReduxActionEnhancedProps {
  // Called to skip to the next song in the queue.
  nextSong: () => SkipRelativeAction;

  // Called to skip to the previous song in the queue.
  previousSong: () => SkipRelativeAction;

  // Called to start playback.
  play: () => SetPlaybackAction;

  // Called to temporarily stop playback.
  pause: () => SetPlaybackAction;
}
const mapDispatchToProps = (
  dispatch: Dispatch<Action>
): ReduxActionEnhancedProps =>
  bindActionCreators({ nextSong, previousSong, play, pause }, dispatch);

interface ReduxStateEnhancedProps {
  // The currently playing queue item. Undefined if nothing is playing.
  queueItem?: QueueItem;

  // Whether or not audio should be playing.
  playing: boolean;
}

const mapStateToProps = ({ queue }: ReduxState): ReduxStateEnhancedProps => {
  const queueItem = nowPlayingSelector(queue);
  const { shouldBePlaying } = queue;
  return { queueItem, playing: shouldBePlaying };
};

export interface ReduxEnhancedProps
  extends InputProps,
    ReduxActionEnhancedProps,
    ReduxStateEnhancedProps {}

export const reduxEnhancer = connect<
  ReduxStateEnhancedProps,
  ReduxActionEnhancedProps,
  InputProps,
  ReduxState
>(mapStateToProps, mapDispatchToProps);
