import React from 'react';
import { AlbumsQuery, Result } from './enhancers/query';
import { AlbumsPage } from './components/AlbumsPage';

export const Albums = () => (
  <AlbumsQuery>
    {(result: Result) => {
      if (result.loading || !result.data) {
        return null;
      }

      return (
        <AlbumsPage
          albums={result.data.albums}
          fetchMore={result.getNextPage}
        />
      );
    }}
  </AlbumsQuery>
);
