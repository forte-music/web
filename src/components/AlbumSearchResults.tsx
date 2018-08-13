import React from 'react';
import {
  ArtworkGrid,
  EmptyResult,
  SearchResultTypeContainer,
  SearchResultTypeHeader,
} from './styled/search';

import { Album, AlbumInfo } from './AlbumsContainer/components/AlbumInfo';
import { LinkStyled } from './LinkStyled';

interface Props {
  // Query which yielded the albums below.
  query: string;

  // Albums which were found. Undefined when initially loading.
  albums?: Album[];
}

export const AlbumSearchResults = (props: Props) => (
  <SearchResultTypeContainer>
    <SearchResultTypeHeader>
      <LinkStyled to={`/search/${props.query}/albums`}>Albums</LinkStyled>
    </SearchResultTypeHeader>

    {props.albums ? (
      props.albums.length ? (
        <ArtworkGrid>
          {props.albums.map((album, index) => (
            <AlbumInfo key={index} album={album} />
          ))}
        </ArtworkGrid>
      ) : (
        <EmptyResult>No albums found</EmptyResult>
      )
    ) : (
      <EmptyResult>Loading...</EmptyResult>
    )}
  </SearchResultTypeContainer>
);

// TODO: Loading More
