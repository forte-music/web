import React from 'react';
import { AlbumsQuery } from './enhancers/query';
import { AlbumSearchResults } from '../AlbumSearchResults';

interface Props {
  query: string;
}

export const AlbumSearchResultsContainer = (props: Props) => (
  <AlbumsQuery variables={{ query: props.query }}>
    {result => (
      <AlbumSearchResults
        query={props.query}
        albums={
          !result.loading
            ? result.data && result.data.albums.edges.map(edge => edge.node)
            : undefined
        }
      />
    )}
  </AlbumsQuery>
);
