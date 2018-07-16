import React from 'react';
import styles from './style.css';
import sharedStyles from '../../../shared.css';
import { pluralize } from '../../../utils';
import { PlaybackAlbumArtwork } from '../../PlaybackAlbumArtwork';
import { ArtworkTwoInfo } from '../../ArtworkTwoInfo';
import { Link } from 'react-router-dom';
import { albumPath } from '../../../utils/paths';
import { ArtistQuery_artist } from '../enhancers/__generated__/ArtistQuery';
import Title from '../../Title';

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
          artwork={<PlaybackAlbumArtwork album={album} />}
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
