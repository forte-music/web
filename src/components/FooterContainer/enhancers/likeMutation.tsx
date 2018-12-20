import React from 'react';
import { Mutation, MutationProps } from 'react-apollo';
import { gql } from 'apollo-boost';

import {
  ToggleLikeMutation as Data,
  ToggleLikeMutationVariables as Variables,
} from './__generated__/ToggleLikeMutation';
import { Omit } from '../../../utils';

const mutation = gql`
  mutation ToggleLikeMutation($songId: ID!) {
    toggleLike(songId: $songId) {
      id

      songStats {
        id
        liked
      }
    }
  }
`;

export const LikeMutation = (
  props: Omit<MutationProps<Data, Variables>, 'mutation'>
) => <Mutation mutation={mutation} {...props} />;
