import React from 'react';
import PlaybackArtwork from './PlaybackArtworkContainer';
import { Link } from 'react-router-dom';
import { albumPath } from '../utils/paths';
import { AlbumArtwork } from './AlbumArtwork';

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

export const PlaybackAlbumArtwork = ({
  album,
  backgroundInteraction,
}: Props) => (
  <PlaybackArtwork
    backgroundInteraction={backgroundInteraction}
    kind={'ALBUM'}
    list={album.id}
    // TODO: Extract this into method in common ancestor.
    tracks={album.songs.map(({ id }, idx) => ({
      songId: id,
      source: { song: idx.toString() },
    }))}
  >
    <Link to={albumPath(album.id)}>
      <AlbumArtwork album={album} />
    </Link>
  </PlaybackArtwork>
);
