// @flow
import type { ComponentType } from 'react';
import { graphql } from 'react-apollo';
import { connect } from 'react-redux';
import { compose } from 'redux';

import type { State } from '../../state';
import type { QueueItemSource } from '../../state/queue';
import type { PlaylistModel } from './Playlist';

import Playlist from './Playlist';
import { Playlist as Query, PlaylistPage as PageQuery } from './query.graphql';
import nowPlayingSelector from '../../selectors/nowPlaying';
import { pause, play, replaceQueue } from '../../actions';
import type { PlaybackState } from '../../components/PlaybackArtwork';

type InputProps = {
  match: { params: { id: string } },
};

const last = <T>(arr: T[]): ?T => arr[arr.length - 1];

const defaultPlaylist = {
  items: {
    edges: [],
  },
};

type GraphQLEnhancedProps = {
  id: string,
  playlist?: PlaylistModel,
  fetchMore: () => void,
};

const graphqlEnhancer = graphql(Query, {
  options: ({ match: { params: { id } } }: InputProps) => ({
    variables: {
      playlistId: id,
    },
  }),
  props: ({
    ownProps: { match: { params: { id } } },
    data: { playlist, loading, fetchMore, variables },
  }): GraphQLEnhancedProps => ({
    id,
    loading,
    playlist,
    fetchMore: () => {
      if (loading || !playlist) {
        return;
      }

      const { cursor: lastCursor = '' } = last(playlist.items.edges) || {};

      return fetchMore({
        query: PageQuery,
        variables: {
          ...variables,
          cursor: lastCursor,
        },
        updateQuery: (
          { playlist: previousResult = defaultPlaylist },
          { fetchMoreResult: { playlist: fetchMoreResult } }
        ) => ({
          playlist: {
            ...previousResult,
            items: {
              ...previousResult.items,
              edges: [
                ...previousResult.items.edges,
                ...fetchMoreResult.items.edges,
              ],
            },
          },
        }),
      });
    },
  }),
});

type ReduxStateEnhancedProps = {
  state: PlaybackState,
  nowPlayingSongSource?: string,
};

type ReduxActionEnhancedProps = {
  onPause: () => void,
  onPlay: () => void,
  onStartPlayback: () => void,
};

const reduxEnhancer = connect(
  (
    { queue }: State,
    { playlist: { id } = {} }: GraphQLEnhancedProps
  ): ReduxStateEnhancedProps => {
    const { listSource, songSource } = nowPlayingSelector(queue) || {};
    const nowPlaying = listSource === id;

    return {
      state: nowPlaying
        ? queue.shouldBePlaying ? 'PLAYING' : 'PAUSED'
        : 'STOPPED',
      nowPlayingSongSource: nowPlaying ? songSource : undefined,
    };
  },
  (
    dispatch,
    { playlist: { id, items: playlistItems } = {} }: GraphQLEnhancedProps
  ): ReduxActionEnhancedProps => ({
    onPause: () => dispatch(pause()),
    onPlay: () => dispatch(play()),
    onStartPlayback: () => {
      // Collect Items
      // TODO: This collects only loaded items.
      if (!playlistItems) {
        return;
      }

      const items: QueueItemSource[] = playlistItems.edges.map(
        ({ node: { id: songSource, song: { id: songId } } }) => ({
          songSource,
          listSource: id,
          songId,
        })
      );

      dispatch(replaceQueue(items));
      dispatch(play());
    },
  })
);

const enhancer = compose(graphqlEnhancer, reduxEnhancer);

// A connected version of the Playlist component which retrieves its data
// using GraphQL and delivers state changes to a redux store.
const ConnectedPlaylist: ComponentType<InputProps> = enhancer(Playlist);

export default ConnectedPlaylist;
