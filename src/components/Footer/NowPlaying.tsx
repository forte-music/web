import React from 'react';
import { Song } from '../FooterContainer/enhancers/query';
import { InlineArtistsList } from '../InlineArtistsList';
import { AlbumLink } from '../AlbumLink';
import { AlbumArtwork } from '../AlbumArtwork';
import styles from './NowPlaying.css';

interface Props {
  song: Song;
}

const NowPlaying = ({ song: { name: songName, album, artists } }: Props) => (
  <div className={styles.container}>
    <div className={styles.image}>
      <AlbumArtwork album={album} />
    </div>
    <div className={styles.infoContainer}>
      <div className={styles.title}>{songName}</div>
      <div className={styles.detail}>
        <InlineArtistsList artists={artists} />
        {' - '}
        <AlbumLink album={album} />
      </div>
    </div>
  </div>
);

export default NowPlaying;
