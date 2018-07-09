import React from 'react';

import Title from '../../Title';
import { AlbumsQuery_albums } from '../enhancers/__generated__/AlbumsQuery';
import { AlbumInfo } from './AlbumInfo';
import styles from './Albums.css';
import Observer from 'react-intersection-observer';

export interface Props {
  albums?: AlbumsQuery_albums;
  fetchMore: () => void;
}

const Albums = ({ albums, fetchMore }: Props) => (
  <div>
    <Title segments={['Albums']} />

    <div className={styles.heading}>Albums</div>
    <div className={styles.container}>
      {albums &&
        albums.edges.map(({ node }) => (
          <AlbumInfo key={node.id} album={node} />
        ))}
      <Observer
        key={'final'}
        onChange={inView => {
          if (!inView) {
            return;
          }

          fetchMore();
        }}
      >
        <div />
      </Observer>
    </div>
  </div>
);

export default Albums;
