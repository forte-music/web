// @flow
import React from 'react';
import { Link } from 'react-router-dom';

import { formatDuration } from '../../utils';
import styles from './Detail.css';
import { album, artist } from '../../paths';

// Header and row element for the detailed song list which is used in queue,
// playlist, etc..

export const Header = () => (
  <div className={styles.header}>
    <div className={styles.song}>Name</div>
    <div className={styles.album}>Album</div>
    <div className={styles.artist}>Artist</div>
    <div className={styles.duration}>Duration</div>
  </div>
);

type Artist = {
  id: string,
  name: string,
};

type Album = {
  id: string,
  name: string,
  +artist: Artist,
};

export type Song = {
  id: string,
  name: string,
  +album: Album,
  duration: number,
};

export type SongRowProps = {
  // When this is undefined, the component is in a loading state.
  +song?: Song,

  // Whether or not the current item should be styled as if it is active.
  // Defaults to false.
  active?: boolean,

  // Called when the component is double clicked.
  onDoubleClick?: () => void,
};

export const Row = ({
  song: songDetails,
  active,
  onDoubleClick,
}: SongRowProps) => (
  <div
    className={[
      styles.row,
      !songDetails ? styles.empty : '',
      active ? styles.active : '',
    ].join(' ')}
    onDoubleClick={onDoubleClick}
  >
    <div className={styles.song}>{songDetails && songDetails.name}</div>
    <div className={styles.album}>
      {songDetails && (
        <Link to={album(songDetails.album.id)}>{songDetails.album.name}</Link>
      )}
    </div>

    <div className={styles.artist}>
      {songDetails && (
        <Link to={artist(songDetails.album.artist.id)}>
          {songDetails.album.artist.name}
        </Link>
      )}
    </div>
    <div className={styles.duration}>
      {songDetails && <span>{formatDuration(songDetails.duration)}</span>}
    </div>
  </div>
);
