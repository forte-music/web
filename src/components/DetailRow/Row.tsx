import React from 'react';
import styles from './index.css';
import { formatDuration } from '../../utils/duration';
import { Artist, InlineArtistsList } from '../InlineArtistsList';
import { AlbumLink, Album } from '../AlbumLink';
import { BaseRow } from '../BaseRow';

interface Song {
  name: string;
  duration: number;
  album: Album;
  artists: Artist[];
}

export interface Props {
  song?: Song;
  active: boolean;
  onDoubleClick?: () => void;
}

export const Row = ({ song, active, onDoubleClick }: Props) => (
  <BaseRow active={active} empty={!song} onDoubleClick={onDoubleClick}>
    <div className={styles.song}>{song && song.name}</div>
    <div className={styles.album}>
      {song && <AlbumLink album={song.album} />}
    </div>

    <div className={styles.artist}>
      {song && <InlineArtistsList artists={song.artists} />}
    </div>
    <div className={styles.duration}>
      {song && <span>{formatDuration(song.duration)}</span>}
    </div>
  </BaseRow>
);
