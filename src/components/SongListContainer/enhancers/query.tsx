import React from 'react';
import { Query, QueryProps } from 'react-apollo';
import gql from 'graphql-tag';
import {
  SongListRowQuery as Data,
  SongListRowQueryVariables as Variables,
} from './__generated__/SongListRowQuery';
import { Omit } from '../../../utils';

export const fragment = gql`
  fragment SongDetailFragment on Song {
    id
    name
    duration

    artists {
      id
      name
    }

    album {
      id
      name
    }
  }
`;

const query = gql`
  query SongListRowQuery($songId: ID!) {
    song(id: $songId) {
      ...SongDetailFragment
    }
  }

  ${fragment}
`;

export const SongListRowQuery = (
  props: Omit<QueryProps<Data, Variables>, 'query'>
) => <Query query={query} {...props} />;
