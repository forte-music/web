import React from 'react';
import PlaybackArtwork from './PlaybackArtworkContainer';
import { Link } from 'react-router-dom';
import { album } from '../utils/paths';

import Artwork from './Artwork';
import DefaultCover from '../components/icons/DefaultCover';

export interface Album {
  id: string;
  artworkUrl: string | null;
  name: string;
  songs: Array<{ id: string }>;
}

export interface Props {
  album: Album;
  backgroundInteraction?: boolean;
}

export const AlbumArtwork = ({
  album: { id: albumId, artworkUrl, name, songs },
  backgroundInteraction,
}: Props) => (
  <PlaybackArtwork
    backgroundInteraction={backgroundInteraction}
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
);
