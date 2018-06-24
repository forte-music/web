import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import { InputProps } from '..';
import {
  ArtistQuery,
  ArtistQuery_artist,
} from '../../../__generated__/ArtistQuery';

export interface OutputProps {
  artist?: ArtistQuery_artist;
}

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

export const queryEnhancer = graphql<ArtistQuery, InputProps, OutputProps>(
  query,
  {
    options: ({ match: { params: { id } } }) => ({
      variables: { artistId: id },
    }),
    props: ({ data: { artist } = { artist: undefined } }): OutputProps => ({
      artist,
    }),
  }
);
