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

export type Song = {
  name: string,
  +album: Album,
  duration: number,
};

export type SongRowProps = {
  // When this is undefined, the component is in a loading state.
  +song?: Song,
};

export const Row = ({ song }: SongRowProps) => (
  <div className={[styles.row, !song ? styles.empty : ''].join(' ')}>
    <span className={styles.song}>{song && song.name}</span>
    <span className={styles.album}>{song && song.album.name}</span>
    <span className={styles.artist}>{song && song.album.artist.name}</span>
    <span className={styles.duration}>
      {song && formatDuration(song.duration)}
    </span>
  </div>
);
