// @flow
import { graphql } from 'react-apollo';
import type { RouterHistory, Match } from 'react-router-dom';
import { Playlist as Query, PlaylistPage as PageQuery } from './query.graphql';

import Playlist from './Playlist';

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

// A connected version of the Playlist component which retrieves its data
// using GraphQL.
const ConnectedPlaylist = graphql(Query, {
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
    data: { playlist = defaultPlaylist, loading, fetchMore, variables },
  }) => ({
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
})(Playlist);

export default ConnectedPlaylist;
