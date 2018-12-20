import React from 'react';
import {
  AlbumResultsQuery as Data,
  AlbumResultsQueryVariables as Variables,
} from './__generated__/AlbumResultsQuery';
import { gql } from 'apollo-boost';
import {
  ConnectionQuery,
  ConnectionQueryResult,
  ExposedConnectionQueryProps,
} from '../../ConnectionQuery';

export const albumSearchResultFragment = gql`
  fragment AlbumSearchResults on AlbumConnection {
    pageInfo {
      hasNextPage
    }

    edges {
      node {
        id
        artworkUrl
        name
        artist {
          id
          name
        }
        songs {
          id
        }
      }
    }
  }
`;

const query = gql`
  query AlbumResultsQuery($cursor: String, $query: String!, $first: Int!) {
    albums(
      first: $first
      after: $cursor
      sort: { filter: $query, sortBy: LEXICOGRAPHICALLY }
    ) @connection {
      ...AlbumSearchResults
    }
  }

  ${albumSearchResultFragment}
`;

export type Result = ConnectionQueryResult<Data, Variables>;

export const AlbumsQuery = (
  props: ExposedConnectionQueryProps<Data, Variables>
) => <ConnectionQuery query={query} children={props.children} {...props} />;
