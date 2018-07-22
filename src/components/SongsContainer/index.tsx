import React from 'react';
import SongsInner from './components/Songs';
import { Result, SongsQuery } from './enhancers/query';
import { SongsContainerState } from './enhancers/state';
import { SortBy } from './enhancers/__generated__/SongsQuery';

export const Songs = () => (
  <SongsContainerState sortBy={SortBy.LEXICOGRAPHICALLY} isReverse>
    {({ isReverse, setReverse, sortBy, setSortBy }) => (
      <SongsQuery variables={{ isReverse, sortBy }}>
        {(result: Result) => {
          if (result.loading || !result.data) {
            return null;
          }

          return (
            <SongsInner
              songs={result.data.songs.edges.map(({ node }) => node)}
              hasMore={result.data.songs.pageInfo.hasNextPage}
              loadMore={result.getNextPage}
              isReverse={isReverse}
              setReverse={setReverse}
              sortBy={sortBy}
              setSortBy={setSortBy}
            />
          );
        }}
      </SongsQuery>
    )}
  </SongsContainerState>
);
