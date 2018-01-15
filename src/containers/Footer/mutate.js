// @flow
import { graphql } from 'react-apollo';
import type { OptionProps } from 'react-apollo';
import gql from 'graphql-tag';

import { defaultConfig } from './query';
import Mutation from './mutate.graphql';
import type { ToggleLikeMutation } from './__generated__/ToggleLikeMutation';
import type { QueryEnhancedProps } from './query';
import type { PlaySongMutation } from './__generated__/PlaySongMutation';
import type { QueueItem } from '../../state/queue';

type LikeMutationProps = QueryEnhancedProps & {
  onToggleLike?: () => void,
};

export const likeMutationEnhancer = graphql(Mutation, {
  ...defaultConfig,
  props: ({
    ownProps,
    mutate,
  }: OptionProps<
    QueryEnhancedProps,
    ToggleLikeMutation
  >): LikeMutationProps => ({
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

export type PlayMutationProps = LikeMutationProps & {
  playSong: QueueItem => void,
};

export const playSongMutationEnhancer = graphql(
  gql`
    mutation PlaySongMutation(
      $songId: ID!
      $playlistId: ID
      $albumId: ID
      $artistId: ID
    ) {
      playSong(
        songId: $songId
        playlistId: $playlistId
        albumId: $albumId
        artistId: $artistId
      ) {
        id
      }
    }
  `,
  {
    props: ({
      ownProps,
      mutate,
    }: OptionProps<
      QueryEnhancedProps,
      PlaySongMutation
    >): PlayMutationProps => ({
      ...ownProps,
      playSong: () => {
        const { queueItem: { songId, source: { kind, list } = {} } } = ownProps;

        mutate({
          variables: {
            songId,
            playlistId: kind === 'PLAYLIST' ? list : undefined,
            albumId: kind === 'ALBUM' ? list : undefined,
            artistId: kind === 'ARTIST' ? list : undefined,
          },
        });
      },
    }),
  }
);
