import React from 'react';
import { Query, QueryProps } from 'react-apollo';
import {
  SearchQuery as Data,
  SearchQueryVariables as Variables,
} from './__generated__/SearchQuery';
import gql from 'graphql-tag';
import { Omit } from '../../../utils';

import { albumSearchResultFragment } from '../../AlbumSearchResultsContainer/enhancers/query';
import { songSearchResultFragment } from '../../SongSearchResultsContainer/enhancers/query';

const query = gql`
  query SearchQuery($query: String!) {
    albums(first: 6, sort: { filter: $query, sortBy: LEXICOGRAPHICALLY }) {
      ...AlbumSearchResults
    }

    songs(first: 10, sort: { filter: $query, sortBy: LEXICOGRAPHICALLY }) {
      ...SongSearchResults
    }
  }

  ${albumSearchResultFragment}
  ${songSearchResultFragment}
`;

export const SearchQuery = (
  props: Omit<QueryProps<Data, Variables>, 'query'>
) => <Query query={query} {...props} />;
