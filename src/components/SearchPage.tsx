import React from 'react';

import { HeaderContainer } from './styled/HeaderContainer';
import { Container } from './Container';
import { SongList } from './SongList';
import {
  DetailRow,
  DetailRowHeader,
  Song as DetailRowSong,
} from './DetailSongTable';
import {
  ArtworkGrid,
  EmptyResult,
  SearchHeaderContainer,
  SearchInput,
  SearchResultTypeContainer,
  SearchResultTypeHeader,
  SpacedEmptyResult,
} from './styled/search';

import { Album, AlbumInfo } from './AlbumsContainer/components/AlbumInfo';
import { SearchQuery } from './SearchContainer/enhancers/__generated__/SearchQuery';

interface Props {
  // The query currently displayed in the search field.
  query: string;

  // Called when typing happens in the search field.
  setQuery: (newQuery: string) => void;

  // Called to start loading results for the current query immediately. By
  // default results are loaded after the debounce timeout of setQuery.
  updateResultsNow: () => void;

  // Search results. Displays a prompt when undefined.
  results?: SearchQuery;

  // True whenever a request for data is in-flight.
  isLoading: boolean;

  // Identifier of the active song if the song playing was added from a
  // search page with the same query.
  activeSongId?: string;

  // Starts playing the resulting songs from the specified index.
  startPlayingFromSong: (index: number) => void;
}

export const SearchPage = (props: Props) => (
  <div>
    <HeaderContainer>
      <SearchHeaderContainer>
        <SearchInput
          onKeyPress={event =>
            event.key === 'Enter' && props.updateResultsNow()
          }
          onChange={event => props.setQuery(event.target.value)}
          value={props.query}
          placeholder="Search..."
        />
      </SearchHeaderContainer>
    </HeaderContainer>

    <Container>
      {props.isLoading && <SpacedEmptyResult>Loading...</SpacedEmptyResult>}

      {props.results && (
        <React.Fragment>
          <SearchResultTypeContainer>
            <SearchResultTypeHeader>Albums</SearchResultTypeHeader>
            <AlbumResults
              albums={props.results.albums.edges.map(({ node }) => node)}
            />
          </SearchResultTypeContainer>
          <SearchResultTypeContainer>
            <SearchResultTypeHeader>Songs</SearchResultTypeHeader>
            <SongsResults
              songs={props.results.songs.edges.map(({ node }) => node)}
              activeSongId={props.activeSongId}
              startPlayingFromSong={props.startPlayingFromSong}
            />
          </SearchResultTypeContainer>
        </React.Fragment>
      )}
    </Container>
  </div>
);

interface AlbumResultsProps {
  albums: Album[];
}

const AlbumResults = (props: AlbumResultsProps) =>
  props.albums.length ? (
    <ArtworkGrid>
      {props.albums.map((album, index) => (
        <AlbumInfo key={index} album={album} />
      ))}
    </ArtworkGrid>
  ) : (
    <EmptyResult>No albums found</EmptyResult>
  );

interface Song extends DetailRowSong {
  id: string;
}

interface SongResultsProps {
  songs: Song[];
  activeSongId?: string;
  startPlayingFromSong: (index: number) => void;
}

const SongsResults = (props: SongResultsProps) => (
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
);

// TODO: Load More Results
// TODO: Artists

// TODO: Refactor mappings
