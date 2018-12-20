import React from 'react';
import { SongsPage } from './components/SongsPage';
import { Result, SongsQuery } from './enhancers/query';
import { SongsContainerState } from './enhancers/state';
import { SortBy } from '../../__generated__/globalTypes';
import { SongsContainerReduxState } from './enhancers/redux';

export const Songs = () => (
  <SongsContainerState sortBy={SortBy.LEXICOGRAPHICALLY} isReverse={false}>
    {({ isReverse, setReverse, sortBy, setSortBy }) => (
      <SongsQuery variables={{ isReverse, sortBy }}>
        {(result: Result) => {
          if (!result.data || !result.data.songs) {
            return null;
          }

          const songs = result.data.songs.edges.map(({ node }) => node);
          const hasNextPage = result.data.songs.pageInfo.hasNextPage;

          return (
            <SongsContainerReduxState songs={songs}>
              {({ activeSongId, startPlayingFrom }) => (
                <SongsPage
                  songs={songs}
                  activeSongId={activeSongId}
                  isLoadingMore={result.loading}
                  hasMore={hasNextPage}
                  loadMore={result.getNextPage}
                  isReverse={isReverse}
                  setReverse={setReverse}
                  sortBy={sortBy}
                  setSortBy={setSortBy}
                  startPlayingFrom={startPlayingFrom}
                />
              )}
            </SongsContainerReduxState>
          );
        }}
      </SongsQuery>
    )}
  </SongsContainerState>
);
