import { graphql } from 'react-apollo';
import { OptionProps } from 'react-apollo';
import gql from 'graphql-tag';
import { SongListRow } from '../../../__generated__/SongListRow';
import { SongRowProps as OutputProps } from '../../../components/SongList/Detail';

interface InputProps {
  songId: string;
  active?: boolean;
  onDoubleClick?: () => void;
}

export const queryEnhancer = graphql<SongListRow, InputProps>(
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
    props: ({
      ownProps,
      data,
    }: OptionProps<InputProps, SongListRow>): OutputProps => ({
      ...ownProps,
      song: data && data.song,
    }),
  }
);
