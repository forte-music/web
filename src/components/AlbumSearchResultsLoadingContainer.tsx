import React from 'react';
import {
  EmptyResult,
  SearchResultTypeContainer,
  SearchResultTypeHeader,
} from './styled/search';

import { Album } from './AlbumsContainer/components/AlbumInfo';
import { LinkStyled } from './LinkStyled';

interface Props {
  // Query which yielded the albums below.
  query: string;

  // Albums which were found. Undefined when initially loading.
  albums?: Album[];

  children: (albums: Album[]) => React.ReactNode;
}

// Renders header for album search results. Handles the cases when `albums` is
// undefined or an empty array. Calls the `children` function when neither is
// the case.
export const AlbumSearchResultsLoadingContainer = (props: Props) => (
  <SearchResultTypeContainer>
    <SearchResultTypeHeader>
      <LinkStyled to={`/search/${props.query}/albums`}>Albums</LinkStyled>
    </SearchResultTypeHeader>

    {props.albums ? (
      props.albums.length ? (
        props.children(props.albums)
      ) : (
        <EmptyResult>No albums found</EmptyResult>
      )
    ) : (
      <EmptyResult>Loading...</EmptyResult>
    )}
  </SearchResultTypeContainer>
);
