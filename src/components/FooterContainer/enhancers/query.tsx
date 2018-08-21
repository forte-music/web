import React from 'react';
import {
  FooterQuery as Data,
  FooterQueryVariables as Variables,
} from './__generated__/FooterQuery';
import gql from 'graphql-tag';
import { Omit } from '../../../utils';
import { Query, QueryProps } from 'react-apollo';

export { FooterQuery_song as Song } from './__generated__/FooterQuery';

const query = gql`
  query FooterQuery($songId: ID!) {
    song(id: $songId) {
      id
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

export const FooterQuery = (
  props: Omit<QueryProps<Data, Variables>, 'query'>
) => <Query query={query} {...props} />;
