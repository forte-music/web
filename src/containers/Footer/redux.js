// @flow
import type { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import type { InputProps } from '.';
import type { State as ReduxState } from '../../state';
import type { QueueItem } from '../../state/queue';
import type {
  Action,
  SetPlaybackAction,
  SkipRelativeAction,
} from '../../actions';
import { nowPlaying as nowPlayingSelector } from '../../selectors/nowPlaying';
import { nextSong, pause, play, previousSong } from '../../actions';

export type ReduxActionEnhancedProps = {
  nextSong: () => SkipRelativeAction,
  previousSong: () => SkipRelativeAction,
  play: () => SetPlaybackAction,
  pause: () => SetPlaybackAction,
};
const mapDispatchToProps = (
  dispatch: Dispatch<Action>
): ReduxActionEnhancedProps =>
  bindActionCreators({ nextSong, previousSong, play, pause }, dispatch);

type ReduxStateEnhancedProps = {
  queueItem?: QueueItem,
  playing: boolean,
};

const mapStateToProps = ({ queue }: ReduxState): ReduxStateEnhancedProps => {
  const queueItem = nowPlayingSelector(queue) || undefined;
  const { shouldBePlaying } = queue;
  return { queueItem, playing: shouldBePlaying };
};

export type ReduxEnhancedProps = InputProps &
  ReduxActionEnhancedProps &
  ReduxStateEnhancedProps;

export const reduxEnhancer = connect(mapStateToProps, mapDispatchToProps);
