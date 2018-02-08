// @flow
import React from 'react';

import Title from '../../components/Title';
import type { AlbumsQuery_albums } from './__generated__/AlbumsQuery';
import { AlbumInfo } from './AlbumInfo';
import styles from './Albums.css';

// TODO: Design Album Count

export type Props = {
  albums?: AlbumsQuery_albums,
  fetchMore: () => void,
  loading: boolean,
};

const Albums = ({ albums }: Props) => (
  <div>
    <Title segments={['Albums']} />

    <div className={styles.heading}>Albums</div>
    <div className={styles.container}>
      {albums &&
        albums.edges.map(({ node }) => (
          <AlbumInfo key={node.id} album={node} />
        ))}
    </div>
  </div>
);

export default Albums;
