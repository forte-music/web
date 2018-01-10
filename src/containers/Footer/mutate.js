// @flow
import { graphql } from 'react-apollo';
import type { OptionProps } from 'react-apollo';

import { defaultConfig } from './query';
import Mutation from './mutate.graphql';
import type { ToggleLikeMutation } from './__generated__/ToggleLikeMutation';
import type { QueryEnhancedProps } from './query';

type GraphQLEnhancedProps = QueryEnhancedProps & {
  onToggleLike: () => void,
};

export const graphqlMutationEnhancer = graphql(Mutation, {
  ...defaultConfig,
  props: ({
    ownProps,
    mutate,
  }: OptionProps<
    QueryEnhancedProps,
    ToggleLikeMutation
  >): GraphQLEnhancedProps => ({
    ...ownProps,
    onToggleLike: () => {
      mutate({
        optimisticResponse: {
          toggleLike: {
            ...ownProps.nowPlaying.stats,
            liked: !ownProps.nowPlaying.stats.liked,
          },
        },
      });
    },
  }),
});
