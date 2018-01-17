// @flow
import React from 'react';

import type { Edge, Connection } from '../../graphql/mock';
import { formatDuration } from '../../utils';

import PlaybackArtwork from '../../containers/PlaybackArtwork';
import SongList from '../../components/SongList/SongList';
import SongCollage from '../../components/SongCollage';
import { Header, Row } from '../../components/SongList/Detail';

import type { Props as EnhancedProps } from './index';

import styles from './Playlist.css';
import type { QueueItemSource } from '../../state/queue';

type Artist = {
  id: string,
  name: string,
};

type Album = {
  id: string,
  name: string,
  artworkUrl: ?string,
};

type Song = {
  id: string,
  name: string,
  duration: number,
  album: Album,
  artists: Artist[],
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

  // Whether or not this playlist is currently playing.
  isPlaying: boolean,

  // The playlist to render.
  playlist?: PlaylistModel,

  // The QueueItem.songSource of the currently playing song. This may be
  // supplied when state is PLAYING.
  nowPlayingSongSource?: string,

  // Called when the list has started playing.
  onStartPlaying: (items: QueueItemSource[], startIndex: number) => void,
};

// eslint-disable-next-line no-unused-expressions
(((undefined: any): EnhancedProps): Props);

// TODO: Loading State
// TODO: Add Enqueue and Three Dots Button

const Playlist = ({
  playlist: {
    id,
    items: { count = 0, edges = [] } = {},
    name = '',
    duration = 0,
  } = {},
  isPlaying,
  fetchMore,
  nowPlayingSongSource,
  onStartPlaying,
}: Props) => {
  const queueItems = edges.map(
    ({ node: { id: songSource, song: { id: songId } } }) => ({
      source: { kind: 'PLAYLIST', song: songSource, list: id },
      songId,
    })
  );

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.headerContainer}>
          <div className={styles.artworkContainer}>
            <PlaybackArtwork
              kind={'PLAYLIST'}
              list={id}
              loadTracks={async () => queueItems}
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
          </div>

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
          countAvailableRows={edges.length}
          totalItems={count}
          loadMore={fetchMore}
          header={<Header />}
          renderItem={({ index, style }) => {
            const { node: { id: itemId, song } }: Edge<PlaylistItem> = edges[
              index
            ];

            return (
              <div key={itemId} style={style}>
                <Row
                  song={song}
                  active={isPlaying && nowPlayingSongSource === itemId}
                  onDoubleClick={() => {
                    if (!isPlaying) {
                      onStartPlaying(queueItems, index);
                    }
                  }}
                />
              </div>
            );
          }}
        />
      </div>
    </div>
  );
};

export default Playlist;
