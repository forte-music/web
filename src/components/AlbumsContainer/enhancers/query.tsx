import React from 'react';
import { gql } from 'apollo-boost';

import {
  ConnectionQuery,
  ConnectionQueryResult,
  ExposedConnectionQueryProps,
} from '../../ConnectionQuery';
import {
  AlbumsQuery as Data,
  AlbumsQueryVariables as Variables,
} from './__generated__/AlbumsQuery';

const query = gql`
  query AlbumsQuery($cursor: String, $pageSize: Int) {
    albums(first: $pageSize, after: $cursor) @connection {
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
  props: ExposedConnectionQueryProps<Data, Variables>
) => <ConnectionQuery query={query} children={props.children} {...props} />;
