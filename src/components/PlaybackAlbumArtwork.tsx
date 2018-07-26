import React from 'react';
import PlaybackArtwork from './PlaybackArtworkContainer';
import { Link } from 'react-router-dom';
import { albumPath } from '../utils/paths';
import { AlbumArtwork } from './AlbumArtwork';
import { Kind, QueueItemSource } from '../redux/state/queue';

export interface Album {
  id: string;
  artworkUrl: string | null | void;
  name: string;
  songs: Array<{ id: string }>;
}

export interface Props {
  album: Album;
  backgroundInteraction?: boolean;
}

export const getTracks = (album: Album): QueueItemSource[] =>
  album.songs.map(({ id }, idx) => ({
    songId: id,
    source: { song: idx.toString(), list: album.id, kind: 'ALBUM' as Kind },
  }));

export const PlaybackAlbumArtwork = ({
  album,
  backgroundInteraction,
}: Props) => (
  <PlaybackArtwork
    backgroundInteraction={backgroundInteraction}
    kind={'ALBUM'}
    list={album.id}
    tracks={getTracks(album)}
  >
    <Link to={albumPath(album.id)}>
      <AlbumArtwork album={album} />
    </Link>
  </PlaybackArtwork>
);
