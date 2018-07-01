import { graphql } from 'react-apollo';
import { Album } from '../../../__generated__/Album';
import gql from 'graphql-tag';
import { Props as InputProps } from '..';
import { Props as OutputProps } from '../component';

const query = gql`
  query Album($albumId: ID!) {
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

export const queryEnhancer = graphql<Album, InputProps, Partial<OutputProps>>(
  query,
  {
    options: ({ match: { params: { id } } }) => ({
      variables: { albumId: id },
    }),
    props: ({
      data: { album } = { album: undefined },
    }): Partial<OutputProps> => ({
      album,
    }),
  }
);
