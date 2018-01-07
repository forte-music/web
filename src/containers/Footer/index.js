// @flow
import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';

import { nextSong, pause, play, previousSong } from '../../actions';
import type { State as ReduxState } from '../../state';
import nowPlayingSelector from '../../selectors/nowPlaying';

import SONGS from '../../model';

import Footer from './Footer';

const mapDispatchToProps = dispatch =>
  bindActionCreators({ nextSong, previousSong, play, pause }, dispatch);

const mapStateToProps = ({ queue }: ReduxState) => {
  const song = nowPlayingSelector(queue) || {};
  const { songId } = song;

  const nowPlaying = songId && SONGS[songId];
  const { shouldBePlaying } = queue;
  return { nowPlaying, playing: shouldBePlaying };
};

// TODO: Connect to GraphQL

const reduxEnhancer = connect(mapStateToProps, mapDispatchToProps);

const enhancer = compose(reduxEnhancer);

export default enhancer(Footer);
