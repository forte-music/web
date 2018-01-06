// @flow
import { graphql } from 'react-apollo';
import { connect } from 'react-redux';
import type { RouterHistory, Match } from 'react-router-dom';
import { compose } from 'redux';

import Playlist from './Playlist';
import { Playlist as Query, PlaylistPage as PageQuery } from './query.graphql';
import type { State } from '../../state';
import nowPlayingSelector from '../../selectors/nowPlaying';
import { pause, play, replaceQueue } from '../../actions';
import type { Playlist as PlaylistModel } from '../../model';
import type { QueueItemSource } from '../../state/queue';

type Props = {
  match: Match,
  history: RouterHistory,
};

const last = <T>(arr: T[]): ?T => arr[arr.length - 1];

const defaultPlaylist = {
  items: {
    edges: [],
  },
};

const graphqlEnhancer = graphql(Query, {
  skip: ({ match: { params }, history }: Props): boolean => {
    if (!params['id']) {
      history.replace('/playlists');
      return true;
    }

    return false;
  },
  options: ({ match: { params: { id } } }: Props) => ({
    variables: {
      playlistId: id,
    },
  }),
  props: ({
    ownProps: { match: { params: { id } } },
    data: { playlist = defaultPlaylist, loading, fetchMore, variables },
  }) => ({
    id,
    playlist,
    loading,
    fetchMore: () => {
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
        ) => {
          return {
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
          };
        },
      });
    },
  }),
});

const reduxEnhancer = connect(
  (
    { queue }: State,
    { playlist: { id } = {} }: { playlist?: PlaylistModel }
  ) => {
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
    {
      playlist: { id, items: playlistItems } = {},
    }: { playlist?: PlaylistModel }
  ) => ({
    onPause: dispatch(pause()),
    onPlay: dispatch(play()),
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
    },
  })
);

const enhancer = compose(reduxEnhancer, graphqlEnhancer);

// A connected version of the Playlist component which retrieves its data
// using GraphQL and delivers state changes to a redux store.
const ConnectedPlaylist = enhancer(Playlist);

export default ConnectedPlaylist;
