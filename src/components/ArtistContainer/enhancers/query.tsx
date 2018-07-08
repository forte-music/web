import React from 'react';
import { Query, QueryProps } from 'react-apollo';
import gql from 'graphql-tag';

import {
  ArtistQuery as Data,
  ArtistQueryVariables as Variables,
} from '../../../__generated__/ArtistQuery';
import { Omit } from '../../../utils';

const query = gql`
  query ArtistQuery($artistId: ID!) {
    artist(id: $artistId) {
      id
      name
      albums {
        id
        artworkUrl
        name

        songs {
          id
        }

        duration
        releaseYear
      }
    }
  }
`;

export const ArtistQuery = (
  props: Omit<QueryProps<Data, Variables>, 'query'>
) => <Query query={query} {...props} />;
