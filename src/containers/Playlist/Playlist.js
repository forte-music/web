// @flow
import React from 'react';

import type { PlaylistQuery } from '../../__generated__/queries.flow';

type Props = {
  loading: boolean,
  fetchMore: () => void,
} & PlaylistQuery;

const Playlist = (props: Props) => {
  console.log(props);
  props.fetchMore();

  return <div> HELLO WORLD!</div>;
};

export default Playlist;
