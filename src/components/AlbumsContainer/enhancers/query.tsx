import React from 'react';
import gql from 'graphql-tag';

import {
  ConnectionQuery,
  ConnectionQueryProps,
  ConnectionQueryResult,
} from '../../ConnectionQuery';
import {
  AlbumsQuery as Data,
  AlbumsQueryVariables as Variables,
} from './__generated__/AlbumsQuery';
import { Omit } from '../../../utils';

const query = gql`
  query AlbumsQuery($cursor: String) {
    albums(first: 30, after: $cursor) @connection {
      count
      pageInfo {
        hasNextPage
      }

      edges {
        cursor

        node {
          id
          name
          artworkUrl

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
  }
`;

export type Result = ConnectionQueryResult<Data, Variables>;

export const AlbumsQuery = (
  props: Omit<ConnectionQueryProps<Data, Variables>, 'query'>
) => <ConnectionQuery query={query} children={props.children} {...props} />;
