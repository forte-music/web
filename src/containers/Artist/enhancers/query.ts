import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import { InputProps } from '..';
import { ArtistQuery } from '../../../__generated__/ArtistQuery';
import { Props } from '../component';

type OutputProps = Partial<Props>;

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
