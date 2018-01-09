import { graphql } from 'react-apollo';

import { defaultConfig } from './query';
import Mutation from './mutate.graphql';
import type { ToggleLikeMutation } from './__generated__/ToggleLikeMutation';

type GraphQLEnhancedProps = ReduxEnhancedProps & {
  onToggleLike: () => void,
};

export const graphqlMutationEnhancer = graphql(Mutation, {
  ...defaultConfig,
  props: ({
    ownProps,
    mutate,
  }: OptionProps<
    ReduxEnhancedProps,
    ToggleLikeMutation
  >): GraphQLEnhancedProps => ({
    ...ownProps,
    onToggleLike: () =>
      mutate({
        optimisticResponse: {
          toggleLike: {
            ...ownProps.nowPlaying.stats,
            liked: !ownProps.nowPlaying.stats.liked,
          },
        },
      }),
  }),
});
