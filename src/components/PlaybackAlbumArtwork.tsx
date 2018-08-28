import React from 'react';

import { PlaybackArtworkContainer } from './PlaybackArtworkContainer';
import { AlbumArtwork } from './AlbumArtwork';
import { AlbumLink } from './AlbumLink';

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
  <PlaybackArtworkContainer
    handlesBackgroundInteraction={handlesBackgroundInteraction}
    checkPlayingFrom={isPlayingFromAlbum(album.id)}
    getTracks={async () => getTracks(album)}
  >
    <AlbumLink album={album}>
      <AlbumArtwork album={album} />
    </AlbumLink>
  </PlaybackArtworkContainer>
);
