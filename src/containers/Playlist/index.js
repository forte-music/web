// @flow
import type { ComponentType } from 'react';
import type { Dispatch } from 'redux';
import type { OptionProps } from 'react-apollo';
import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';

import type { State } from '../../state';
import type {
  Playlist as QueryResult,
  Playlist_playlist as PlaylistModel,
} from './__generated__/Playlist';

import Playlist from './Playlist';
import Query from './query.graphql';
import {
  isSource,
  nowPlaying as nowPlayingSelector,
} from '../../selectors/nowPlaying';
import {
  skipRelative,
  replaceQueue,
  skipToPosition,
  play,
} from '../../actions';
import { playList } from '../../actions/creators/queue';
import { connectionQuery } from '../../components/ConnectionQuery';
import type { QueueItemSource } from '../../state/queue';
import type { Action } from '../../actions';

type InputProps = {
  match: { params: { id: string } },
};

type GraphQLEnhancedProps = {
  id: string,
  playlist?: PlaylistModel,
  fetchMore: () => void,
};

const graphqlEnhancer = connectionQuery(Query, {
  options: ({ match: { params: { id } } }: InputProps) => ({
    variables: {
      playlistId: id,
    },
  }),
  props: ({
    ownProps: { match: { params: { id } } },
    data: { loading, playlist },
  }: OptionProps<InputProps, QueryResult>): GraphQLEnhancedProps =>
    ({
      id,
      loading,
      playlist,
    }: any),
});

type ReduxStateEnhancedProps = {
  isPlaying: boolean,
  nowPlayingSongSource?: string,
};

type ReduxActionEnhancedProps = {
  onStartPlaying: (items: QueueItemSource[], startIndex: number) => void,
};

const reduxEnhancer = connect(
  (
    { queue }: State,
    { playlist: { id } = {} }: GraphQLEnhancedProps
  ): ReduxStateEnhancedProps => {
    const { source = {} } = nowPlayingSelector(queue) || {};
    const nowPlaying = isSource(source, 'PLAYLIST', id);

    return {
      isPlaying: nowPlaying,
      nowPlayingSongSource: nowPlaying ? source.song : undefined,
    };
  },
  (dispatch: Dispatch<Action>): ReduxActionEnhancedProps => ({
    ...bindActionCreators(
      { skipRelative, replaceQueue, skipToPosition, play },
      dispatch
    ),
    onStartPlaying: playList(dispatch),
  })
);

type ReduxEnhancedProps = ReduxStateEnhancedProps & ReduxActionEnhancedProps;

export type Props = GraphQLEnhancedProps & ReduxEnhancedProps;

const enhancer = compose(graphqlEnhancer, reduxEnhancer);

// A connected version of the Playlist component which retrieves its data
// using GraphQL and delivers state changes to a redux store.
const ConnectedPlaylist: ComponentType<InputProps> = enhancer(Playlist);

export default ConnectedPlaylist;
