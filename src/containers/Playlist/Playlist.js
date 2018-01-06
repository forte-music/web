// @flow
import React from 'react';

import type {
  Playlist as PlaylistModel,
  Edge,
  PlaylistItem,
} from '../../model';
import { formatDuration } from '../../utils';
import PlaybackArtwork from '../../components/PlaybackArtwork';
import type { PlaybackState } from '../../components/PlaybackArtwork';
import SongList, { DetailHeader, DetailRow } from '../../components/SongList';
import SongCollage from '../../components/SongCollage';

import styles from './Playlist.css';

// TODO: Add Enqueue and Three Dots Button

type Props = {
  // Whether or not data is loading.
  loading: boolean,

  // Called when more items in the playlist are needed.
  fetchMore: () => void,

  // The playlist to render.
  playlist: PlaylistModel,

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

const Playlist = ({
  playlist: { name, duration, items: { count, edges } },
  state,
  fetchMore,
  onPlay,
  onPause,
  onStartPlayback,
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
            songs={edges.map(({ node: { song } }) => song)}
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
        header={<DetailHeader />}
        renderItem={({ index, style }) => {
          const { node: { id, song } }: Edge<PlaylistItem> = edges[index];

          return (
            <div key={id} style={style}>
              <DetailRow song={song} />
            </div>
          );
        }}
      />
    </div>
  </div>
);

export default Playlist;
