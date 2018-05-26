// @flow
/* global process: false */
import gql from 'graphql-tag';
import type { OptionProps } from 'react-apollo';
import { compose } from 'redux';

import { connectionQuery } from '../../components/ConnectionQuery';
import Albums from './Albums';
import type { AlbumsQuery } from './__generated__/AlbumsQuery';

const graphqlEnhancer = connectionQuery(
  gql`
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
  `,
  {
    props: ({
      data: { albums, loading },
    }: OptionProps<Object, AlbumsQuery>) => ({
      albums,
      loading,
    }),
  }
);

const enhancer = compose(graphqlEnhancer);

const EnhancedComponent = enhancer(Albums);

export default EnhancedComponent;
