// @flow
import React from 'react';
import { Link } from 'react-router-dom';

import Artwork from '../Artwork';
import { join, unique } from '../../utils';
import { album, artist } from '../../paths';
import type { Song } from '../../containers/Footer/Footer';
import styles from './NowPlaying.css';

type Props = {
  song: Song,
};

const NowPlaying = ({
  song: {
    name: songName,
    album: { id: albumId, name: albumName, artworkUrl },
    artists,
  },
}: Props) => (
  <div className={styles.container}>
    <div className={styles.image}>
      <Artwork src={artworkUrl} alt="now playing album artwork" />
    </div>
    <div className={styles.infoContainer}>
      <div className={styles.title}>{songName}</div>
      <div className={styles.detail}>
        {unique(
          join(
            artists.map(({ id, name }) => (
              <Link className={styles.artist} to={artist(id)}>
                {name}
              </Link>
            )),
            <span>, </span>
          )
        )}
        {' - '}
        <Link className={styles.album} to={album(albumId)}>
          {albumName}
        </Link>
      </div>
    </div>
  </div>
);

export default NowPlaying;
