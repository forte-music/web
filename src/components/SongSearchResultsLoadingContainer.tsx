import React from 'react';
import { Song as DetailRowSong } from './DetailSongTable';
import {
  SearchResultTypeContainer,
  SearchResultTypeHeader,
  SpacedEmptyResult,
} from './styled/search';
import { LinkStyled } from './LinkStyled';

interface Song extends DetailRowSong {
  id: string;
}

interface Props {
  query: string;
  songs?: Song[];
  children: (songs: Song[]) => React.ReactNode;
}

export const SongSearchResultsLoadingContainer = (props: Props) => (
  <SearchResultTypeContainer>
    <SearchResultTypeHeader>
      <LinkStyled to={`/search/${props.query}/songs`}>Songs</LinkStyled>
    </SearchResultTypeHeader>
    {props.songs ? (
      <React.Fragment>
        {props.children(props.songs)}
        {!props.songs.length && (
          <SpacedEmptyResult>No songs found</SpacedEmptyResult>
        )}
      </React.Fragment>
    ) : (
      <SpacedEmptyResult>Loading...</SpacedEmptyResult>
    )}
  </SearchResultTypeContainer>
);
