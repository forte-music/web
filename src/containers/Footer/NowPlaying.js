// @flow
import React from 'react';

import type { Song } from '../../model';

import styles from './NowPlaying.css';

type Props = {
  song?: Song,
};

const NowPlaying = ({ song }: Props) => {
  if (!song) {
    return <div className={styles.container} />;
  }

  const {
    name: songName,
    album: { name: albumName, artworkUrl, artist: { name: artistName } },
  } = song;

  return (
    <div className={styles.container}>
      <img
        className={styles.image}
        src={artworkUrl}
        alt="now playing album artwork"
      />
      <div className={styles.infoContainer}>
        <div className={styles.title}>{songName}</div>
        <div className={styles.detail}>
          <span>{artistName}</span>
          {' - '}
          <span>{albumName}</span>
        </div>
      </div>
    </div>
  );
};

export default NowPlaying;
