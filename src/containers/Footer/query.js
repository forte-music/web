import { graphql } from 'react-apollo';
import { OptionProps } from 'react-apollo';

import Query from './query.graphql';
import type { ReduxEnhancedProps } from './redux';
import type { FooterQuery } from '../../__generated__/queries';

export const defaultConfig = {
  options: ({ songId }: ReduxEnhancedProps) => ({ variables: { songId } }),
  skip: ({ songId }: ReduxEnhancedProps) => !songId,
};

export const graphqlEnhancer = graphql(Query, {
  ...defaultConfig,
  props: ({
    ownProps,
    data: { song },
  }: OptionProps<ReduxEnhancedProps, FooterQuery>) => ({
    ...ownProps,
    nowPlaying: song,
  }),
});
