import React from 'react';

import Title from '../../Title';
import { DetailRow, Song as DetailRowSong } from '../../DetailSongTable';
import { SortBy } from '../enhancers/__generated__/SongsQuery';
import { InteractiveDetailTableHeader } from './InteractiveDetailTableHeader';
import { InfiniteSongList } from '../../InfiniteSongList';
import { LoadingRow } from '../../LoadingRow';
import {
  Prompt,
  SongListContainer,
  SongListPageHeading,
} from '../../styled/SongListPage';
import { Container } from '../../Container';

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

export const SongsPage = (props: Props) => (
  <div>
    <Title segments={['Songs']} />

    <Container>
      <SongListPageHeading>Songs</SongListPageHeading>

      <SongListContainer>
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
        {!props.songs.length && (
          <Prompt>
            Hmm, it doesn't look like there are any items in your library. Try
            importing some.
          </Prompt>
        )}
      </SongListContainer>
    </Container>
  </div>
);
