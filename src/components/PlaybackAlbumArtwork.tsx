import React from 'react';
import PlaybackArtwork from './PlaybackArtworkContainer';
import { Link } from 'react-router-dom';
import { albumPath } from '../utils/paths';
import { AlbumArtwork } from './AlbumArtwork';
import { PlayingFromAlbum, QueueItemSource } from '../redux/state/queue';
import { isPlayingFromAlbum } from '../redux/selectors/nowPlaying';

export interface Album {
  id: string;
  artworkUrl: string | null | void;
  name: string;
  songs: Array<{ id: string }>;
}

export interface Props {
  album: Album;
  handlesBackgroundInteraction: boolean;
}

export const getTracks = (album: Album): QueueItemSource[] =>
  album.songs.map((song, idx) => ({
    songId: song.id,
    playingFrom: {
      type: 'ALBUM',
      albumId: album.id,
      trackIndex: idx,
    } as PlayingFromAlbum,
  }));

export const PlaybackAlbumArtwork = ({
  album,
  handlesBackgroundInteraction,
}: Props) => (
  <PlaybackArtwork
    handlesBackgroundInteraction={handlesBackgroundInteraction}
    checkPlayingFrom={isPlayingFromAlbum(album.id)}
    tracks={getTracks(album)}
  >
    <Link to={albumPath(album.id)}>
      <AlbumArtwork album={album} />
    </Link>
  </PlaybackArtwork>
);
