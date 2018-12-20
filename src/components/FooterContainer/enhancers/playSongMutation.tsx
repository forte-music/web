import React from 'react';
import { Mutation, MutationProps } from 'react-apollo';
import { gql } from 'apollo-boost';

import {
  PlaySongMutation as Data,
  PlaySongMutationVariables as Variables,
} from './__generated__/PlaySongMutation';
import { Omit } from '../../../utils';

const mutation = gql`
  mutation PlaySongMutation($songId: ID!, $albumId: ID, $artistId: ID) {
    playSong(songId: $songId, albumId: $albumId, artistId: $artistId) {
      song {
        id
      }
    }
  }
`;

export const PlaySongMutation = (
  props: Omit<MutationProps<Data, Variables>, 'mutation'>
) => <Mutation mutation={mutation} {...props} />;
