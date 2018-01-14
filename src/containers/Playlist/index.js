// @flow
import type { ComponentType } from 'react';
import type { OptionProps } from 'react-apollo';
import { connect } from 'react-redux';
import { compose } from 'redux';

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
import { connectionQuery } from '../../components/ConnectionQuery';

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
  nowPlayingSongSource?: string,
};

const reduxEnhancer = connect(
  (
    { queue }: State,
    { playlist: { id } = {} }: GraphQLEnhancedProps
  ): ReduxStateEnhancedProps => {
    const { source = {} } = nowPlayingSelector(queue) || {};
    const nowPlaying = isSource(source, 'PLAYLIST', id);

    return {
      nowPlayingSongSource: nowPlaying ? source.song : undefined,
    };
  }
);

const enhancer = compose(graphqlEnhancer, reduxEnhancer);

// A connected version of the Playlist component which retrieves its data
// using GraphQL and delivers state changes to a redux store.
const ConnectedPlaylist: ComponentType<InputProps> = enhancer(Playlist);

export default ConnectedPlaylist;
