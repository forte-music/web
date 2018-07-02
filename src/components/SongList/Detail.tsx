import * as React from 'react';
import { Link } from 'react-router-dom';

import { formatDuration, join, unique } from '../../utils';
import { album, artist } from '../../paths';
import * as styles from './Detail.css';

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

interface Artist {
  id: string;
  name: string;
}

interface Album {
  id: string;
  name: string;
}

export interface Song {
  id: string;
  name: string;
  album: Album;
  artists: Artist[];
  duration: number;
}

export interface SongRowProps {
  // When this is undefined, the component is in a loading state.
  song?: {
    name: string;
    duration: number;
    album: { id: string; name: string };
    artists: Array<{ id: string; name: string }>;
  };

  // Whether or not the current item should be styled as if it is active.
  // Defaults to false.
  active?: boolean;

  // Called when the component is double clicked.
  onDoubleClick?: () => void;
}

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
        <Link to={album(songDetails.album.id)} className={styles.link}>
          {songDetails.album.name}
        </Link>
      )}
    </div>

    <div className={styles.artist}>
      {songDetails &&
        unique(
          join(
            songDetails.artists.map(({ id, name }) => (
              <Link to={artist(id)} className={styles.link}>
                {name}
              </Link>
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
