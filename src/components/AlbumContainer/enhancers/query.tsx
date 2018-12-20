import React from 'react';
import { Query, QueryProps } from 'react-apollo';
import {
  AlbumQuery as Data,
  AlbumQueryVariables as Variables,
} from './__generated__/AlbumQuery';
import { gql } from 'apollo-boost';
import { Omit } from '../../../utils';

const query = gql`
  query AlbumQuery($albumId: ID!) {
    album(id: $albumId) {
      id
      artworkUrl
      name
      duration
      releaseYear
      artist {
        id
        name
      }
      songs {
        id
        name
        trackNumber
        diskNumber
        duration
        artists {
          id
          name
        }
      }
    }
  }
`;

export const AlbumQuery = (
  props: Omit<QueryProps<Data, Variables>, 'query'>
) => <Query query={query} {...props} />;
