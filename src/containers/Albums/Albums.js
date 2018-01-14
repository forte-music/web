// @flow
import React from 'react';

import Artwork from '../../components/Artwork';
import type { Connection, Edge } from '../../graphql/mock';

import { Link } from 'react-router-dom';
import { album, artist } from '../../paths';
import PlaybackArtwork from '../../containers/PlaybackArtwork';
import type { QueueItemSource } from '../../state/queue';
import styles from './Albums.css';

// TODO: Design Album Count

type Artist = {
  id: string,
  name: string,
};

type Album = {
  id: string,
  name: string,
  artworkUrl: string,
  artist: Artist,
};

type LoadAlbumTracks = (albumId: string) => Promise<QueueItemSource[]>;

export type Props = {
  albums?: Connection<Album>,
  fetchMore: () => void,
  loading: boolean,
  loadAlbumTracks: LoadAlbumTracks,
};

const Albums = ({ albums, loadAlbumTracks }: Props) => (
  <div>
    <div className={styles.heading}>Albums</div>
    <div className={styles.container}>
      {albums &&
        albums.edges.map(({ node }: Edge<Album>) => (
          <AlbumInfo
            key={node.id}
            album={node}
            loadAlbumTracks={loadAlbumTracks}
          />
        ))}
    </div>
  </div>
);

type AlbumInfoProps = {
  album: Album,
  loadAlbumTracks: LoadAlbumTracks,
};

const AlbumInfo = ({
  album: {
    id: albumId,
    artworkUrl,
    name,
    artist: { id: artistId, name: artistName },
  },
  loadAlbumTracks,
}: AlbumInfoProps) => (
  <div className={styles.albumContainer}>
    <div>
      <PlaybackArtwork
        kind={'ALBUM'}
        list={albumId}
        loadTracks={async () => await loadAlbumTracks(albumId)}
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

export default Albums;
