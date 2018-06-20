import * as React from 'react';
import { Link } from 'react-router-dom';

import { album, artist } from '../../paths';

import PlaybackArtwork from '../../containers/PlaybackArtwork';
import Artwork from '../../components/Artwork';
import Dots from '../../components/icons/Dots';
import DefaultCover from '../../components/icons/DefaultCover';

import * as styles from './AlbumInfo.css';
import { AlbumsQuery_albums_edges_node } from '../../__generated__/AlbumsQuery';

// TODO: Click Region
// TODO: Disable Draggable

export interface AlbumInfoProps {
  album: AlbumsQuery_albums_edges_node;
}

export const AlbumInfo = ({
  album: {
    id: albumId,
    artworkUrl,
    name,
    artist: { id: artistId, name: artistName },
    songs,
  },
}: AlbumInfoProps) => (
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
    <div>
      <PlaybackArtwork
        kind={'ALBUM'}
        list={albumId}
        tracks={songs.map(({ id }, idx) => ({
          songId: id,
          source: { song: idx.toString() },
        }))}
      >
        <Link to={album(albumId)}>
          {(artworkUrl && <Artwork src={artworkUrl} alt={name} />) || (
            <DefaultCover />
          )}
        </Link>
      </PlaybackArtwork>
    </div>
    <div className={styles.album}>
      <Link to={album(albumId)} className={styles.link}>
        {name}
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
      <Link to={artist(artistId)} className={styles.link}>
        {artistName}
      </Link>
    </div>
  </div>
);
