import React from 'react';
import { Result, SongsQuery } from './enhancers/query';
import { ReduxContainer } from './enhancers/redux';
import { SongSearchResultsLoadingContainer } from '../SongSearchResultsLoadingContainer';
import { SongList } from '../SongList';
import { DetailRow, DetailRowHeader } from '../DetailSongTable';
import { InfiniteDetailSongList } from '../InfiniteDetailSongList';

import { SortBy } from '../SongsContainer/enhancers/__generated__/SongsQuery';
import { noop } from '../../utils';

interface Props {
  // Whether or not to load more results when scrolling to the bottom of the
  // page.
  loadMore: boolean;

  // The query which the header link navigates and the query used to fetch
  // songs.
  query: string;
}

export const SongSearchResultsContainer = (props: Props) => (
  <SongsQuery
    variables={{ first: props.loadMore ? 100 : 10, query: props.query }}
  >
    {(result: Result) => {
      const songs =
        !result.loading && result.data
          ? result.data.songs.edges.map(edge => edge.node)
          : undefined;

      const hasMore = !!result.data && result.data.songs.pageInfo.hasNextPage;

      return (
        <ReduxContainer currentQuery={props.query} songs={songs}>
          {reduxParams => (
            <SongSearchResultsLoadingContainer
              query={props.query}
              songs={songs}
            >
              {songs =>
                props.loadMore ? (
                  <InfiniteDetailSongList
                    songs={songs}
                    activeSongId={reduxParams.activeSongId}
                    hasMore={hasMore}
                    loadMore={result.getNextPage}
                    isLoadingMore={result.loading}
                    sortBy={SortBy.LEXICOGRAPHICALLY}
                    setSortBy={noop}
                    isReverse={false}
                    setReverse={noop}
                    startPlayingFrom={reduxParams.startPlayingFromSong}
                  />
                ) : (
                  <SongList
                    header={<DetailRowHeader />}
                    rows={songs}
                    render={(item, index) => (
                      <DetailRow
                        key={index}
                        song={item}
                        active={item.id === reduxParams.activeSongId}
                        onDoubleClick={() =>
                          reduxParams.startPlayingFromSong(index)
                        }
                      />
                    )}
                  />
                )
              }
            </SongSearchResultsLoadingContainer>
          )}
        </ReduxContainer>
      );
    }}
  </SongsQuery>
);

// TODO: Allow Adjusting Sort
