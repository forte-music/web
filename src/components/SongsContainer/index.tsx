import React from 'react';
import SongsInner from './components/Songs';
import { Result, SongsQuery } from './enhancers/query';
import { SongsContainerState } from './enhancers/state';
import { SortBy } from './enhancers/__generated__/SongsQuery';

export const Songs = () => (
  <SongsContainerState sortedBy={SortBy.LEXICOGRAPHICALLY} isReversed>
    {({ isReversed, sortedBy, setReversed, setSortedBy }) => (
      <SongsQuery>
        {(result: Result) => {
          if (result.loading || !result.data) {
            return null;
          }

          return (
            <SongsInner
              songs={result.data.songs.edges.map(({ node }) => node)}
              hasMore={result.data.songs.pageInfo.hasNextPage}
              loadMore={result.getNextPage}
              isReversed={isReversed}
              sortedBy={sortedBy}
              setReversed={setReversed}
              setSortedBy={setSortedBy}
            />
          );
        }}
      </SongsQuery>
    )}
  </SongsContainerState>
);
