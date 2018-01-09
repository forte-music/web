// @flow
import React from 'react';

import { formatDuration } from '../../utils';
import styles from './Detail.css';

// Header and row element for the detailed song list which is used in queue,
// playlist, etc..

export const Header = () => (
  <div className={styles.header}>
    <span className={styles.song}>Name</span>
    <span className={styles.album}>Album</span>
    <span className={styles.artist}>Artist</span>
    <span className={styles.duration}>Duration</span>
  </div>
);

type Artist = {
  name: string,
};

type Album = {
  name: string,
  +artist: Artist,
};

type Song = {
  name: string,
  +album: Album,
  duration: number,
};

type SongRowProps = {
  +song: Song,
};

export const Row = ({ song }: SongRowProps) => (
  <div className={styles.row}>
    <span className={styles.song}>{song.name}</span>
    <span className={styles.album}>{song.album.name}</span>
    <span className={styles.artist}>{song.album.artist.name}</span>
    <span className={styles.duration}>{formatDuration(song.duration)}</span>
  </div>
);
