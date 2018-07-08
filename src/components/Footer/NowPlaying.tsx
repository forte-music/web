import * as React from 'react';
import { Link } from 'react-router-dom';

import Artwork from '../Artwork';
import { join, unique } from '../../utils';
import { album, artist } from '../../utils/paths';
import { Song } from '../../containers/Footer/enhancers/query';
import * as styles from './NowPlaying.css';
import DefaultCover from '../icons/DefaultCover';

interface Props {
  song: Song;
}

const NowPlaying = ({
  song: {
    name: songName,
    album: { id: albumId, name: albumName, artworkUrl },
    artists,
  },
}: Props) => (
  <div className={styles.container}>
    <div className={styles.image}>
      {(artworkUrl && <Artwork src={artworkUrl} alt={albumName} />) || (
        <DefaultCover />
      )}
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
