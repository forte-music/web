// @flow
import { graphql } from 'react-apollo';
import { OptionProps } from 'react-apollo';

import Query from './query.graphql';
import type { ReduxEnhancedProps } from './redux';
import type {
  Footer as FooterQuery,
  Footer_song as Song,
} from './__generated__/Footer';

export const defaultConfig = {
  options: ({ songId }: ReduxEnhancedProps) => ({ variables: { songId } }),
  skip: ({ songId }: ReduxEnhancedProps): boolean => !songId,
};

export type QueryEnhancedProps = ReduxEnhancedProps & {
  nowPlaying?: Song,
};

export const graphqlEnhancer = graphql(Query, {
  ...defaultConfig,
  props: ({
    ownProps,
    data: { song },
  }: OptionProps<ReduxEnhancedProps, FooterQuery>): QueryEnhancedProps => ({
    ...ownProps,
    nowPlaying: song,
  }),
});
