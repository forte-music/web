import React from 'react';
import styles from './style.css';
import sharedStyles from '../../../shared.css';
import { pluralize } from '../../../utils';
import { AlbumArtwork } from '../../../components/AlbumArtwork';
import { ArtworkTwoInfo } from '../../../components/ArtworkTwoInfo';
import { Link } from 'react-router-dom';
import { album as albumPath } from '../../../utils/paths';
import { ArtistQuery_artist } from '../../../__generated__/ArtistQuery';
import Title from '../../../components/Title';

export interface Props {
  artist: ArtistQuery_artist;
}

const Header = (props: {
  artist: { name: string; albums: { length: number } };
}) => (
  <div className={styles.headerPanel}>
    <div className={styles.artistName}>{props.artist.name}</div>
    <div className={styles.artistStats}>
      {props.artist.albums.length}{' '}
      {pluralize('album', props.artist.albums.length)}
    </div>
  </div>
);

export const Artist = (props: Props) => (
  <div>
    <Title segments={[props.artist.name]} />
    <Header artist={props.artist} />

    <div className={styles.albums}>
      {props.artist.albums.map(album => (
        <ArtworkTwoInfo
          artwork={<AlbumArtwork album={album} />}
          lineOne={
            <Link to={albumPath(album.id)} className={sharedStyles.link}>
              {album.name}
            </Link>
          }
          lineTwo={album.releaseYear}
        />
      ))}
    </div>
  </div>
);
