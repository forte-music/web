import React from 'react';
import {
  SearchResultTypeContainer,
  SearchResultTypeHeader,
  SpacedEmptyResult,
} from './styled/search';
import {
  DetailRow,
  DetailRowHeader,
  Song as DetailRowSong,
} from './DetailSongTable';
import { SongList } from './SongList';
import { LinkStyled } from './LinkStyled';

interface Props {
  // Query which yielded the songs.
  query: string;

  // Identifier of the active song if the song playing was added from a
  // search page with the same query.
  activeSongId?: string;

  // Starts playing the resulting songs from the specified index.
  startPlayingFromSong: (index: number) => void;

  // The songs which were found. Undefined when loading.
  songs?: Song[];
}

export const SongSearchResults = (props: Props) => (
  <SearchResultTypeContainer>
    <SearchResultTypeHeader>
      <LinkStyled to={`/search/${props.query}/songs`}>Songs</LinkStyled>
    </SearchResultTypeHeader>
    {props.songs ? (
      <React.Fragment>
        <SongList
          header={<DetailRowHeader />}
          rows={props.songs}
          render={(item, index) => (
            <DetailRow
              key={index}
              song={item}
              active={item.id === props.activeSongId}
              onDoubleClick={() => props.startPlayingFromSong(index)}
            />
          )}
        />
        {!props.songs.length && (
          <SpacedEmptyResult>No songs found</SpacedEmptyResult>
        )}
      </React.Fragment>
    ) : (
      <SpacedEmptyResult>Loading...</SpacedEmptyResult>
    )}
  </SearchResultTypeContainer>
);

interface Song extends DetailRowSong {
  id: string;
}

// TODO: Loading More
