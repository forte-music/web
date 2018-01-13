import React from 'react';

import Artwork from '../../components/Artwork';
import type { Connection, Edge } from '../../graphql/mock';

import styles from './Albums.css';
import { Link } from 'react-router-dom';
import { album, artist } from '../../paths';
import PlaybackArtwork from '../../components/PlaybackArtwork';

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

export type Props = {
  albums?: Connection<Album>,
  fetchMore: () => void,
  loading: boolean,
};

const Albums = ({ albums }: Props) => (
  <div>
    <div className={styles.heading}>Albums</div>
    <div className={styles.container}>
      {albums &&
        albums.edges.map(({ node }: Edge<Album>) => (
          <AlbumInfo key={node.id} album={node} />
        ))}
    </div>
  </div>
);

const AlbumInfo = ({
  album: {
    id: albumId,
    artworkUrl,
    name,
    artist: { id: artistId, name: artistName },
  },
}: {
  album: Album,
}) => (
  <div className={styles.albumContainer}>
    <div className={styles.artwork}>
      <PlaybackArtwork
        onStartPlayback={x => console.log('asdf', x)}
        state={'STOPPED'}
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
