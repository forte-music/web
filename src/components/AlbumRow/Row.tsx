import React from 'react';
import styles from './index.css';
import { formatDuration } from '../../utils/duration';
import { Artist, InlineArtistsList } from '../InlineArtistsList';
import { BaseRow } from '../BaseRow';

interface Song {
  name: string;
  duration: number;
  trackNumber: number;
  artists: Artist[];
}

export interface Props {
  // When this is undefined, the component is in a loading state.
  song?: Song;

  // Whether or not the current item should be styled as if it is active.
  // Defaults to false.
  active: boolean;

  // Called when the component is double clicked.
  onDoubleClick?: () => void;
}

export const Row = ({ song, active, onDoubleClick }: Props) => (
  <BaseRow active={active} empty={!song} onDoubleClick={onDoubleClick}>
    <div className={styles.trackNumber}>{song && song.trackNumber}</div>
    <div className={styles.name}>{song && song.name}</div>

    <div className={styles.artists}>
      {song && <InlineArtistsList artists={song.artists} />}
    </div>

    <div className={styles.duration}>
      {song && <span>{formatDuration(song.duration)}</span>}
    </div>
  </BaseRow>
);
