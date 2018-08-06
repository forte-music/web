import React from 'react';
import { Query, QueryProps } from 'react-apollo';
import {
  SearchQuery as Data,
  SearchQueryVariables as Variables,
} from './__generated__/SearchQuery';
import gql from 'graphql-tag';
import { Omit } from '../../../utils';

const query = gql`
  query SearchQuery($query: String!) {
    albums(first: 6, sort: { filter: $query, sortBy: LEXICOGRAPHICALLY }) {
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

    songs(first: 10, sort: { filter: $query, sortBy: LEXICOGRAPHICALLY }) {
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
  }
`;

export const SearchQuery = (
  props: Omit<QueryProps<Data, Variables>, 'query'>
) => <Query query={query} {...props} />;
