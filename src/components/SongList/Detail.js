// @flow
import React from 'react';
import { Link } from 'react-router-dom';

import { formatDuration, join, unique } from '../../utils';
import { album, artist } from '../../paths';
import styles from './Detail.css';

// Header and row element for the detailed song list which is used in queue,
// playlist, etc..

export const Header = () => (
  <div className={styles.header}>
    <div className={styles.song}>Name</div>
    <div className={styles.album}>Album</div>
    <div className={styles.artist}>Artists</div>
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
};

export type Song = {
  id: string,
  name: string,
  +album: Album,
  +artists: $ReadOnlyArray<Artist>,
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
      {songDetails &&
        unique(
          join(
            songDetails.artists.map(({ id, name }) => (
              <Link to={artist(id)}>{name}</Link>
            )),
            <span>, </span>
          )
        )}
    </div>
    <div className={styles.duration}>
      {songDetails && <span>{formatDuration(songDetails.duration)}</span>}
    </div>
  </div>
);
