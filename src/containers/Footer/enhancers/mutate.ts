import { graphql } from 'react-apollo';
import { OptionProps } from 'react-apollo';
import gql from 'graphql-tag';

import { defaultConfig } from './query';
import { ToggleLikeMutation } from '../../../__generated__/ToggleLikeMutation';
import { QueryEnhancedProps } from './query';
import { PlaySongMutation } from '../../../__generated__/PlaySongMutation';

interface LikeMutationProps extends QueryEnhancedProps {
  // Toggles the liked state of this song. (nowPlaying.stats.liked).
  onToggleLike: () => void;
}

export const likeMutationEnhancer = graphql<
  ToggleLikeMutation,
  QueryEnhancedProps,
  LikeMutationProps
>(
  gql`
    mutation ToggleLikeMutation($songId: ID!) {
      toggleLike(songId: $songId) {
        id

        songStats {
          id
          liked
        }
      }
    }
  `,
  {
    ...defaultConfig,
    props: ({
      ownProps,
      mutate,
    }: OptionProps<
      QueryEnhancedProps,
      ToggleLikeMutation
    >): LikeMutationProps => ({
      ...ownProps,
      onToggleLike: () => mutate && mutate({}),
    }),
  }
);

export interface PlayMutationProps extends LikeMutationProps {
  // Called to report the currently playing song. This is after playing or
  // seek past the four minutes mark or after half of the track, whichever
  // comes first. This should be called at most once per song.
  playSong: () => void;
}

export const playSongMutationEnhancer = graphql<
  PlaySongMutation,
  LikeMutationProps,
  PlayMutationProps
>(
  gql`
    mutation PlaySongMutation($songId: ID!, $albumId: ID, $artistId: ID) {
      playSong(songId: $songId, albumId: $albumId, artistId: $artistId) {
        song {
          id
        }
      }
    }
  `,
  {
    props: ({
      ownProps,
      mutate,
    }: OptionProps<
      LikeMutationProps,
      PlaySongMutation
    >): PlayMutationProps => ({
      ...ownProps,
      playSong: () => {
        if (!ownProps.queueItem) {
          throw new TypeError(
            `Tried to update the stats for the currently playing item when nothing was playing.`
          );
        }

        const {
          songId,
          source: { kind, list } = { kind: undefined, list: undefined },
        } = ownProps.queueItem;

        if (!mutate) {
          throw new TypeError(`Unxepected undefined mutate method.`);
        }

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
