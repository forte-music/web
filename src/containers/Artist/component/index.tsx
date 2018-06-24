import { ArtistQuery_artist } from '../../../__generated__/ArtistQuery';
import * as React from 'react';
import * as styles from './style.css';
import { pluralize } from '../../../utils';
import { AlbumArtwork } from '../../../components/AlbumArtwork';
import Play from '../../../components/icons/Play';
import Plus from '../../../components/icons/Plus';
import Dots from '../../../components/icons/Dots';

export interface Props {
  artist: ArtistQuery_artist;
}

const Artist = (props: Props) => (
  <div>
    <div className={styles.headerPanel}>
      <div className={styles.artistName}>{props.artist.name}</div>
      <div className={styles.artistStats}>
        {props.artist.albums.length}{' '}
        {pluralize('album', props.artist.albums.length)}
      </div>
      <div className={styles.buttonContainer}>
        <Play svgClass={styles.button} />
        <Plus svgClass={styles.button} />
        <Dots svgClass={styles.button} />
      </div>
    </div>

    <div className={styles.albums}>
      {props.artist.albums.map(album => (
        <div className={styles.album}>
          <div className={styles.albumArtwork}>
            <AlbumArtwork album={album} />
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default (props: Partial<Props>) => {
  if (props.artist) {
    return <Artist artist={props.artist} />;
  }

  return null;
};
