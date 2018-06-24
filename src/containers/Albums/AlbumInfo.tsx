import * as React from 'react';
import { Link } from 'react-router-dom';
import { album as albumPath, artist as artistPath } from '../../paths';
import Dots from '../../components/icons/Dots';
import * as styles from './AlbumInfo.css';
import { AlbumsQuery_albums_edges_node } from '../../__generated__/AlbumsQuery';
import { AlbumArtwork } from '../../components/AlbumArtwork';

// TODO: Click Region
// TODO: Disable Draggable

export interface AlbumInfoProps {
  album: AlbumsQuery_albums_edges_node;
}

export const AlbumInfo = ({ album }: AlbumInfoProps) => (
  <div
    className={styles.container}
    onContextMenu={e => {
      if (e.altKey) {
        // Ignore If Alt Is Pressed
        return;
      }

      e.preventDefault();

      // TODO: Launch Popup Menu
    }}
  >
    <AlbumArtwork album={album} />
    <div className={styles.album}>
      <Link to={albumPath(album.id)} className={styles.link}>
        {album.name}
      </Link>

      <div
        onClick={e => {
          e.preventDefault();
          // TODO: Launch Popup Menu
        }}
        className={styles.iconContainer}
      >
        <Dots svgClass={styles.icon} />
      </div>
    </div>

    <div className={styles.artist}>
      <Link to={artistPath(album.artist.id)} className={styles.link}>
        {album.artist.name}
      </Link>
    </div>
  </div>
);
