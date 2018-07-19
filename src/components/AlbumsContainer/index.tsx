import React from 'react';
import { AlbumsQuery, Result } from './enhancers/query';
import AlbumsInner from './components/Albums';

export const Albums = () => (
  <AlbumsQuery>
    {(result: Result) => {
      if (result.loading || !result.data) {
        return null;
      }

      return (
        <AlbumsInner
          albums={result.data.albums}
          fetchMore={result.getNextPage}
        />
      );
    }}
  </AlbumsQuery>
);
