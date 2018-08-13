import React from 'react';
import { Query, QueryProps } from 'react-apollo';
import {
  SongResultsQuery as Data,
  SongResultsQueryVariables as Variables,
} from './__generated__/SongResultsQuery';
import gql from 'graphql-tag';
import { Omit } from '../../../utils';

export const songsSearchResultFragment = gql`
  fragment SongSearchResults on SongConnection {
    pageInfo {
      hasNextPage
    }

    edges {
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
  query SongResultsQuery($query: String!) {
    songs(first: 10, sort: { filter: $query, sortBy: LEXICOGRAPHICALLY }) {
      ...SongSearchResults
    }
  }

  ${songsSearchResultFragment}
`;

export const SongsQuery = (
  props: Omit<QueryProps<Data, Variables>, 'query'>
) => <Query query={query} {...props} />;
