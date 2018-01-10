import { graphql } from 'react-apollo';
import type { OptionProps } from 'react-apollo';
import gql from 'graphql-tag';
import type { SongListRow as Query } from './__generated__/SongListRow';
import type { SongRowProps as OutputProps } from '../../components/SongList/Detail';
import { DetailRow } from '../../components/SongList';

type InputProps = {
  songId: string,
  active?: boolean,
  onDoubleClick?: () => void,
};

const graphqlEnhancer = graphql(
  gql`
    query SongListRow($songId: ID!) {
      song(id: $songId) {
        id
        name
        duration

        artists {
          id
          name
        }

        album {
          id
          name

          artist {
            id
            name
          }
        }
      }
    }
  `,
  {
    options: ({ songId }: InputProps) => ({ variables: { songId } }),
    skip: ({ songId }: InputProps): boolean => !songId,
    props: ({
      ownProps,
      data: { song },
    }: OptionProps<InputProps, Query>): OutputProps => ({
      ...ownProps,
      song,
    }),
  }
);

const EnhancedDetailRow = graphqlEnhancer(DetailRow);

export default EnhancedDetailRow;
