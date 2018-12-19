import React from 'react';
import { AlbumsQuery, Result } from './enhancers/query';
import { AlbumSearchResultsLoadingContainer } from '../AlbumSearchResultsLoadingContainer';
import { ArtworkGrid } from '../styled/artworkGrid';
import { OnEnterView } from '../OnEnterView';
import { AlbumGrid } from '../AlbumGrid';

import { calcArtworkPageSize } from '../../styled-mixins/artworkGrid';

interface Props {
  // Whether or not to load more items when scrolled to the bottom of the page.
  loadMore: boolean;

  // The query which the header link navigates to and used to fetch songs.
  query: string;
}

// Fetches data and renders album results of search results pages.
export const AlbumSearchResultsContainer = (props: Props) => (
  <AlbumsQuery
    variables={{
      query: props.query,
      first: props.loadMore ? calcArtworkPageSize() : 6,
    }}
  >
    {(result: Result) => (
      <AlbumSearchResultsLoadingContainer
        query={props.query}
        albums={
          !result.loading
            ? result.data && result.data.albums.edges.map(edge => edge.node)
            : undefined
        }
        children={albums => (
          <React.Fragment>
            <ArtworkGrid>
              <AlbumGrid albums={albums} />

              {props.loadMore &&
                !result.loading &&
                result.data &&
                result.data.albums.pageInfo.hasNextPage && (
                  <OnEnterView onView={result.getNextPage} />
                )}
            </ArtworkGrid>
          </React.Fragment>
        )}
      />
    )}
  </AlbumsQuery>
);
