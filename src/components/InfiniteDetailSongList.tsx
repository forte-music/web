import React from 'react';
import { DetailRow, Song as DetailRowSong } from './DetailSongTable';
import { InfiniteSongList } from './InfiniteSongList';
import { LoadingRow } from './LoadingRow';
import { InteractiveDetailTableHeader } from './InteractiveDetailTableHeader';

import { SortBy } from '../__generated__/globalTypes';

export interface Props {
  // Songs to display in the list.
  songs: Song[];

  // The identifier of the active song. Undefined if no song is active. The
  // song with this identifier will be styled as active.
  activeSongId?: string;

  // If there are more elements to load. When true, loadMore is called when
  // more items are needed.
  hasMore: boolean;

  // Called to load more items.
  loadMore: () => void;

  // True when more items are being loaded. A loading row is displayed as
  // the last row of the list when true.
  isLoadingMore: boolean;

  // Field which is currently being sorted by.
  sortBy: SortBy;

  // Update the currently sorted by field.
  setSortBy: (newSort: SortBy) => void;

  // Whether or not the sort is reversed.
  isReverse: boolean;

  // Update the sort direction.
  setReverse: (newReverse: boolean) => void;

  // Starts playing all the songs in the view sorted order starting from the
  // song at index. Called when a song is double clicked.
  startPlayingFrom: (index: number) => void;
}

interface Song extends DetailRowSong {
  id: string;
}

export const InfiniteDetailSongList = (props: Props) => (
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
      <InteractiveDetailTableHeader
        sortBy={props.sortBy}
        setSortBy={props.setSortBy}
        isReverse={props.isReverse}
        setReverse={props.setReverse}
      />
    }
  />
);
