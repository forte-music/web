import React from 'react';
import Observer from 'react-intersection-observer';
import { AlbumsQuery, Result } from './enhancers/query';
import { AlbumSearchResultsLoadingContainer } from '../AlbumSearchResultsLoadingContainer';
import { AlbumInfo } from '../AlbumsContainer/components/AlbumInfo';
import { ArtworkGrid } from '../styled/search';

interface Props {
  // Whether or not to load more items when scrolled to the bottom of the page.
  loadMore: boolean;

  // The query which the header link navigates to and used to fetch songs.
  query: string;
}

// Fetches data and renders album results of search results pages.
export const AlbumSearchResultsContainer = (props: Props) => (
  <AlbumsQuery
    variables={{ query: props.query, first: props.loadMore ? 30 : 6 }}
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
              {albums.map(album => <AlbumInfo key={album.id} album={album} />)}
              {props.loadMore &&
                !result.loading &&
                result.data &&
                result.data.albums.pageInfo.hasNextPage && (
                  <Observer
                    key={'final'}
                    onChange={inView => {
                      if (!inView) {
                        return;
                      }

                      result.getNextPage();
                    }}
                  >
                    <div />
                  </Observer>
                )}
            </ArtworkGrid>
          </React.Fragment>
        )}
      />
    )}
  </AlbumsQuery>
);

// TODO: Share Loading More Logic With AlbumsPage
