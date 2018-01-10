// @flow
import React from 'react';

import type { Edge, Connection } from '../../graphql/data';
import { formatDuration } from '../../utils';

import type { PlaybackState } from '../../components/PlaybackArtwork';
import PlaybackArtwork from '../../components/PlaybackArtwork';
import SongList from '../../components/SongList/SongList';
import SongCollage from '../../components/SongCollage';
import { Header, Row } from '../../components/SongList/Detail';

import styles from './Playlist.css';

type Artist = {
  id: string,
  name: string,
};

type Album = {
  id: string,
  name: string,
  artworkUrl?: string,
  artist: Artist,
};

type Song = {
  id: string,
  name: string,
  duration: number,
  album: Album,
};

type PlaylistItem = {
  id: string,
  song: Song,
};

export type PlaylistModel = {
  id: string,
  name: string,
  duration: number,
  items: Connection<PlaylistItem>,
};

export type Props = {
  // Called when more items in the playlist are needed.
  fetchMore: () => void,

  // The playlist to render.
  playlist?: PlaylistModel,

  // The state of this list's playback.
  state: PlaybackState,

  // The QueueItem.songSource of the currently playing song. This may be
  // supplied when state is PLAYING.
  nowPlayingSongSource?: string,

  // Called when it is time to transition from a playing state to a paused
  // state.
  onPause: () => void,

  // Called when it is time to transition from a paused or stopped sate to a
  // playing state.
  onPlay: () => void,

  // Called when it is time to transition from a stopped state to a playing
  // state.
  onStartPlayback: () => void,
};

// TODO: Loading State
// TODO: Add Enqueue and Three Dots Button

const Playlist = ({
  playlist: {
    items: { count = 0, edges = [] } = {},
    name = '',
    duration = 0,
  } = {},
  state,
  fetchMore,
  onPlay,
  onPause,
  onStartPlayback,
  nowPlayingSongSource,
}: Props) => (
  <div className={styles.container}>
    <header className={styles.header}>
      <div className={styles.headerContainer}>
        <PlaybackArtwork
          state={state}
          onPlaying={onPlay}
          onPaused={onPause}
          onStartPlayback={onStartPlayback}
          backgroundInteraction
        >
          <SongCollage
            artworkUrls={
              ((edges
                .map(({ node }) => node.song.album.artworkUrl)
                .filter(url => !!url): any): string[])
            }
            alt="Playlist Artwork"
          />
        </PlaybackArtwork>

        <div className={styles.infoContainer}>
          <div className={styles.name}>{name}</div>

          <div className={styles.iconsContainer}>
            <div className={styles.duration}>
              {count} songs, {formatDuration(duration)}
            </div>
          </div>
        </div>
      </div>
    </header>

    <div className={styles.bodyContainer}>
      <SongList
        count={edges.length}
        totalItems={count}
        loadMore={fetchMore}
        header={<Header />}
        renderItem={({ index, style }) => {
          const { node: { id, song } }: Edge<PlaylistItem> = edges[index];

          return (
            <div key={id} style={style}>
              <Row
                song={song}
                active={state !== 'STOPPED' && nowPlayingSongSource === id}
              />
            </div>
          );
        }}
      />
    </div>
  </div>
);

export default Playlist;
