import gql from 'graphql-tag';
import { OptionProps } from 'react-apollo';

import { connectionQuery } from '../../components/connectionQuery';
import Albums from './Albums';
import { AlbumsQuery } from '../../__generated__/AlbumsQuery';

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
      data: { albums, loading } = { albums: undefined, loading: true },
    }: OptionProps<{}, AlbumsQuery>) => ({
      albums,
      loading,
    }),
  }
);

const EnhancedComponent = graphqlEnhancer(Albums);

export default EnhancedComponent;
