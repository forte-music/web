import React from 'react';
import { Link } from 'react-router-dom';

import type { AlbumsQuery_albums_edges_node } from './__generated__/AlbumsQuery';

import PlaybackArtwork from '../../containers/PlaybackArtwork';
import Artwork from '../../components/Artwork';
import { album, artist } from '../../paths';
import styles from './Albums.css';

export type AlbumInfoProps = {
  album: AlbumsQuery_albums_edges_node,
};

export const AlbumInfo = ({
  album: {
    id: albumId,
    artworkUrl,
    name,
    artist: { id: artistId, name: artistName },
    songs,
  },
}: AlbumInfoProps) => (
  <div className={styles.albumContainer}>
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
          <Artwork src={artworkUrl} alt={name} />
        </Link>
      </PlaybackArtwork>
    </div>
    <div className={styles.album}>
      <Link to={album(albumId)} className={styles.link}>
        {name}
      </Link>
    </div>

    <div className={styles.artist}>
      <Link to={artist(artistId)} className={styles.link}>
        {artistName}
      </Link>
    </div>
  </div>
);
