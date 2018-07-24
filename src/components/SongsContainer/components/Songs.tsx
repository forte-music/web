import React from 'react';
import Title from '../../Title';

import styles from '../../QueueContainer/component/styles.css';
import { Row as DetailRow, Song as DetailRowSong } from '../../DetailRow/Row';
import { SortBy } from '../enhancers/__generated__/SongsQuery';
import { InteractiveDetailRowHeader } from './InteractiveDetailRowHeader';
import { InfiniteSongList } from '../../InfiniteSongList';
import { LoadingRow } from '../../LoadingRow';

interface Song extends DetailRowSong {
  id: string;
}

interface Props {
  songs: Song[];

  // The identifier of the active song. Undefined if no song is active.
  activeSongId?: string;

  hasMore: boolean;
  loadMore: () => void;
  isLoadingMore: boolean;

  sortBy: SortBy;
  setSortBy: (newSort: SortBy) => void;

  isReverse: boolean;
  setReverse: (newReverse: boolean) => void;

  // Starts playing all the songs in the view sorted order starting from the
  // song at index.
  startPlayingFrom: (index: number) => void;
}

// TODO: Style Hoisting

const Songs = (props: Props) => (
  <div>
    <Title segments={['Songs']} />

    <div className={styles.heading}>Songs</div>

    <div className={styles.body}>
      {props.songs.length && (
        <InfiniteSongList
          rows={props.songs}
          hasMoreRows={props.hasMore}
          loadMoreRows={props.loadMore}
          isLoadingMore={props.isLoadingMore}
          render={(song, index) => (
            <DetailRow
              song={song}
              active={song.id === props.activeSongId}
              onDoubleClick={() => props.startPlayingFrom(index)}
            />
          )}
          loading={<LoadingRow />}
          header={
            <InteractiveDetailRowHeader
              sortBy={props.sortBy}
              setSortBy={props.setSortBy}
              isReverse={props.isReverse}
              setReverse={props.setReverse}
            />
          }
        />
      )}

      {!props.songs.length && (
        <div className={styles.prompt}>
          Hmm, it doesn't look like there were any items in your library. Try
          importing some.
        </div>
      )}
    </div>
  </div>
);

export default Songs;
