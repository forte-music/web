import { graphql } from 'react-apollo';

import { defaultConfig } from './query';
import Mutation from './mutate.graphql';

export const graphqlMutationEnhancer = graphql(Mutation, {
  ...defaultConfig,
  props: ({ ownProps, mutate }) => ({
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
