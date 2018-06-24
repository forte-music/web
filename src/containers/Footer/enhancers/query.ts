import { graphql } from 'react-apollo';
import { OptionProps } from 'react-apollo';

import { ReduxEnhancedProps } from './redux';
import {
  Footer as FooterQuery,
  Footer_song as Song,
} from '../../../__generated__/Footer';
import gql from 'graphql-tag';

export const defaultConfig = {
  options: ({
    queueItem: { songId } = { songId: undefined },
  }: ReduxEnhancedProps) => ({
    variables: { songId },
  }),
  skip: ({ queueItem }: ReduxEnhancedProps): boolean => !queueItem,
};

const query = gql`
  query Footer($songId: ID!) {
    song(id: $songId) {
      id
      streamUrl
      name
      duration

      album {
        id
        artworkUrl
        name
      }

      artists {
        id
        name
      }

      songStats {
        id
        liked
      }
    }
  }
`;

export interface QueryEnhancedProps extends ReduxEnhancedProps {
  // The currently playing song. If this is not defined no song is playing
  // and an inactive footer is rendered.
  nowPlaying?: Song;
}

export type Song = Song;

export const graphqlEnhancer = graphql<FooterQuery, ReduxEnhancedProps>(query, {
  ...defaultConfig,
  props: ({
    ownProps,
    data,
  }: OptionProps<ReduxEnhancedProps, FooterQuery>): QueryEnhancedProps => ({
    ...ownProps,
    nowPlaying: data && data.song,
  }),
});
