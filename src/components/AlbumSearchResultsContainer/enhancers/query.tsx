import React from 'react';
import { Query, QueryProps } from 'react-apollo';
import {
  AlbumResultsQuery as Data,
  AlbumResultsQueryVariables as Variables,
} from './__generated__/AlbumResultsQuery';
import gql from 'graphql-tag';
import { Omit } from '../../../utils';

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
  query AlbumResultsQuery($query: String!) {
    albums(first: 6, sort: { filter: $query, sortBy: LEXICOGRAPHICALLY }) {
      ...AlbumSearchResults
    }
  }

  ${albumSearchResultFragment}
`;

export const AlbumsQuery = (
  props: Omit<QueryProps<Data, Variables>, 'query'>
) => <Query query={query} {...props} />;
