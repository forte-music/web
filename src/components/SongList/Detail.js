// @flow
import React from 'react';
import type { Node } from 'react';
import { Link } from 'react-router-dom';

import { formatDuration } from '../../utils';
import styles from './Detail.css';
import { album, artist, song } from '../../paths';

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

const RowWrapper = ({
  song,
  active,
  onDoubleClick,
  children,
}: SongRowProps & { children: Node }) => (
  <div
    className={[
      styles.row,
      !song ? styles.empty : '',
      active ? styles.active : '',
    ].join(' ')}
    onDoubleClick={onDoubleClick}
  >
    {children}
  </div>
);

export const Row = (props: SongRowProps) => {
  const { song: songDetails } = props;

  if (!songDetails) {
    return (
      <RowWrapper {...props}>
        <span className={styles.song} />
        <span className={styles.album} />
        <span className={styles.artist} />
        <span className={styles.duration} />
      </RowWrapper>
    );
  } else {
    return (
      <RowWrapper {...props}>
        <Link to={song(songDetails.id)} className={styles.song}>
          {songDetails.name}
        </Link>
        <Link to={album(songDetails.album.id)} className={styles.album}>
          {songDetails.album.name}
        </Link>
        <Link
          to={artist(songDetails.album.artist.id)}
          className={styles.artist}
        >
          {songDetails.album.artist.name}
        </Link>
        <span className={styles.duration}>
          {formatDuration(songDetails.duration)}
        </span>
      </RowWrapper>
    );
  }
};
