import gql from 'graphql-tag';
import type { OptionProps } from 'react-apollo';

import { connectionQuery } from '../../components/ConnectionQuery';
import Albums from './Albums';
import type { AlbumsQuery } from './__generated__/AlbumsQuery';
import type { Props } from './Albums';

const graphqlEnhancer = connectionQuery(
  gql`
    query AlbumsQuery($cursor: String) {
      albums(input: { limit: 25, cursor: $cursor }) @connection {
        count
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
          }
        }
      }
    }
  `,
  {
    props: ({
      data: { albums, loading },
    }: OptionProps<void, AlbumsQuery>): Props => ({
      albums,
      loading,
    }),
  }
);

const EnhancedComponent = graphqlEnhancer(Albums);

export default EnhancedComponent;
