import { graphql } from 'react-apollo';
import { OptionProps } from 'react-apollo';
import gql from 'graphql-tag';
import { SongListRow } from '../../__generated__/SongListRow';
import { SongRowProps as OutputProps } from '../../components/SongList/Detail';
import { DetailRow } from '../../components/SongList';

interface InputProps {
  songId: string;
  active?: boolean;
  onDoubleClick?: () => void;
}

const graphqlEnhancer = graphql<SongListRow, InputProps>(
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
        }
      }
    }
  `,
  {
    options: ({ songId }: InputProps) => ({ variables: { songId } }),
    skip: ({ songId }: InputProps): boolean => !songId,
    props: ({
      ownProps,
      data,
    }: OptionProps<InputProps, SongListRow>): OutputProps => ({
      ...ownProps,
      song: data && data.song,
    }),
  }
);

const EnhancedDetailRow = graphqlEnhancer(DetailRow);

export default EnhancedDetailRow;
