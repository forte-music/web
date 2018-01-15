// @flow
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import type { InputProps } from '.';
import type { State as ReduxState } from '../../state';
import type { QueueItem } from '../../state/queue';
import { nowPlaying as nowPlayingSelector } from '../../selectors/nowPlaying';
import { nextSong, pause, play, previousSong } from '../../actions';

export type ReduxActionEnhancedProps = {
  nextSong: () => void,
  previousSong: () => void,
  play: () => void,
  pause: () => void,
};
const mapDispatchToProps = (dispatch): ReduxActionEnhancedProps =>
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
