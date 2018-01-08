// @flow
import { connect } from 'react-redux';
import type { ComponentType } from 'react';
import { bindActionCreators, compose } from 'redux';
import { graphql } from 'react-apollo';
import type { OptionProps } from 'react-apollo';

import Footer from './Footer';
import Query from './query.graphql';
import { nextSong, pause, play, previousSong } from '../../actions';
import nowPlayingSelector from '../../selectors/nowPlaying';
import type { State as ReduxState } from '../../state';
import type { FooterQuery } from '../../__generated__/queries';

type InputProps = {
  className: string,
};

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

type ReduxEnhancedProps = InputProps &
  ReduxActionEnhancedProps &
  ReduxStateEnhancedProps;

const reduxEnhancer = connect(mapStateToProps, mapDispatchToProps);

const graphqlEnhancer = graphql(Query, {
  options: ({ songId }: ReduxEnhancedProps) => ({ variables: { songId } }),
  skip: ({ songId }: ReduxEnhancedProps) => !songId,
  props: ({
    ownProps,
    data: { song },
  }: OptionProps<ReduxEnhancedProps, FooterQuery>) => ({
    ...ownProps,
    nowPlaying: song,
  }),
});

const enhancer = compose(reduxEnhancer, graphqlEnhancer);
const EnhancedFooter: ComponentType<InputProps> = enhancer(Footer);

export default EnhancedFooter;
