import React from 'react';

import Title from '../../Title';
import {
  Prompt,
  SongListContainer,
  SongListPageHeading,
} from '../../styled/SongListPage';
import { Container } from '../../Container';
import {
  InfiniteDetailSongList,
  Props as InfiniteDetailSongListProps,
} from '../../InfiniteDetailSongList';

type Props = InfiniteDetailSongListProps;

export const SongsPage = (props: Props) => (
  <div>
    <Title segments={['Songs']} />

    <Container>
      <SongListPageHeading>Songs</SongListPageHeading>

      <SongListContainer>
        <InfiniteDetailSongList
          songs={props.songs}
          activeSongId={props.activeSongId}
          hasMore={props.hasMore}
          loadMore={props.loadMore}
          isLoadingMore={props.isLoadingMore}
          sortBy={props.sortBy}
          setSortBy={props.setSortBy}
          isReverse={props.isReverse}
          setReverse={props.setReverse}
          startPlayingFrom={props.startPlayingFrom}
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
