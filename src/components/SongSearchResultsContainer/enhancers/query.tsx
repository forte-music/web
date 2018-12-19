import React from 'react';
import {
  SongResultsQuery as Data,
  SongResultsQueryVariables as Variables,
} from './__generated__/SongResultsQuery';
import gql from 'graphql-tag';
import {
  ConnectionQuery,
  ConnectionQueryResult,
  ExposedConnectionQueryProps,
} from '../../ConnectionQuery';

export const songSearchResultFragment = gql`
  fragment SongSearchResults on SongConnection {
    pageInfo {
      hasNextPage
    }

    edges {
      cursor

      node {
        id
        name
        album {
          id
          name
        }
        artists {
          id
          name
        }
        duration
      }
    }
  }
`;

const query = gql`
  query SongResultsQuery(
    $first: Int!
    $query: String!
    $cursor: String
    $sortBy: SortBy!
    $isReverse: Boolean!
  ) {
    songs(
      first: $first
      after: $cursor
      sort: { filter: $query, sortBy: $sortBy, reverse: $isReverse }
    ) @connection {
      ...SongSearchResults
    }
  }

  ${songSearchResultFragment}
`;

export type Result = ConnectionQueryResult<Data, Variables>;

export const SongsQuery = (
  props: ExposedConnectionQueryProps<Data, Variables>
) => <ConnectionQuery query={query} children={props.children} {...props} />;
