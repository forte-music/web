import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import type { InputProps } from '.';
import type { State as ReduxState } from '../../state';
import nowPlayingSelector from '../../selectors/nowPlaying';
import { nextSong, pause, play, previousSong } from '../../actions';

type ReduxActionEnhancedProps = {
  nextSong: () => void,
  previousSong: () => void,
  play: () => void,
  pause: () => void,
};
const mapDispatchToProps = (dispatch): ReduxActionEnhancedProps =>
  bindActionCreators({ nextSong, previousSong, play, pause }, dispatch);

type ReduxStateEnhancedProps = {
  songId?: string,
  playing: boolean,
};

const mapStateToProps = ({ queue }: ReduxState): ReduxStateEnhancedProps => {
  const song = nowPlayingSelector(queue) || {};
  const { shouldBePlaying } = queue;
  const { songId } = song;
  return { songId, playing: shouldBePlaying };
};

export type ReduxEnhancedProps = InputProps &
  ReduxActionEnhancedProps &
  ReduxStateEnhancedProps;

export const reduxEnhancer = connect(mapStateToProps, mapDispatchToProps);
