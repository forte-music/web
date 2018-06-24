import * as React from 'react';
import { Link } from 'react-router-dom';
import { album as albumPath, artist as artistPath } from '../../paths';
import * as styles from '../../shared.css';
import { AlbumsQuery_albums_edges_node } from '../../__generated__/AlbumsQuery';
import { AlbumArtwork } from '../../components/AlbumArtwork';
import { ArtworkTwoInfo } from '../../components/ArtworkTwoInfo';

// TODO: Click Region
// TODO: Disable Draggable

export interface AlbumInfoProps {
  album: AlbumsQuery_albums_edges_node;
}

export const AlbumInfo = ({ album }: AlbumInfoProps) => (
  <ArtworkTwoInfo
    artwork={<AlbumArtwork album={album} />}
    lineOne={
      <Link to={albumPath(album.id)} className={styles.link}>
        {album.name}
      </Link>
    }
    lineTwo={
      <Link to={artistPath(album.artist.id)} className={styles.link}>
        {album.artist.name}
      </Link>
    }
  />
);
