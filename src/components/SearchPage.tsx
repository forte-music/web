import React from 'react';
import styled, { StyledComponentClass } from 'styled-components';

import { HeaderContainer } from './styled/HeaderContainer';
import { Container } from './Container';
import { ArtworkTwoInfo } from './ArtworkTwoInfo';
import { AlbumArtwork } from './AlbumArtwork';
import { AlbumLink } from './AlbumLink';
import { ArtistLink } from './ArtistLink';
import { SongList } from './SongList';
import { DetailRow, DetailRowHeader } from './DetailSongTable';

import { SearchQuery } from './SearchContainer/enhancers/__generated__/SearchQuery';
import { Theme } from '../theme';
import { artworkGrid } from '../styled-mixins/artworkGrid';

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
          type="text"
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
            {props.results.albums.edges.length ? (
              <ArtworkGrid>
                {props.results.albums.edges.map(({ node }) => (
                  <ArtworkTwoInfo
                    key={node.id}
                    artwork={<AlbumArtwork album={node} />}
                    lineOne={<AlbumLink album={node} />}
                    lineTwo={<ArtistLink artist={node.artist} />}
                  />
                ))}
              </ArtworkGrid>
            ) : (
              <EmptyResult>No albums found!</EmptyResult>
            )}
          </SearchResultTypeContainer>
          <SearchResultTypeContainer>
            <SearchResultTypeHeader>Songs</SearchResultTypeHeader>
            <SongList
              header={<DetailRowHeader />}
              rows={props.results.songs.edges}
              render={(item, index) => (
                <DetailRow
                  key={index}
                  song={item.node}
                  active={item.node.id === props.activeSongId}
                  onDoubleClick={() => props.startPlayingFromSong(index)}
                />
              )}
            />
            {!props.results.songs.edges.length && (
              <SpacedEmptyResult>No songs found!</SpacedEmptyResult>
            )}
          </SearchResultTypeContainer>
        </React.Fragment>
      )}
    </Container>
  </div>
);

const placeholderColor = '#757575';
const focusedTextColor = '#ffffff';

const SearchHeaderContainer = styled(Container)`
  display: flex;
  flex-direction: column;
`;

// @ts-ignore
const ArtworkGrid: StyledComponentClass<{}, Theme> = styled.div`
  ${artworkGrid};
`;

const SearchInput = styled.input`
  background: none;
  border: none;
  outline: none;

  color: ${focusedTextColor};

  border-bottom: 1px solid ${placeholderColor};
  padding: ${props => props.theme.sizeTiny};
  font-size: ${props => props.theme.fontSizeMedium};

  margin-top: 68px;
  margin-bottom: ${props => props.theme.sizeLarge};
  margin-left: ${props => props.theme.sizeSmall};
  margin-right: ${props => props.theme.sizeSmall};

  &:focus {
    border-bottom-color: ${focusedTextColor};
  }
`;

const SearchResultTypeContainer = styled.div`
  padding: ${props => props.theme.sizeSmall};
`;

const SearchResultTypeHeader = styled.div`
  color: #ffffff;
  font-size: ${props => props.theme.fontSizeMedium};
  margin-bottom: ${props => props.theme.sizeSmall};
`;

const EmptyResult = styled.div`
  color: ${props => props.theme.headerSecondaryTextColor};
  text-align: center;
`;

const SpacedEmptyResult = EmptyResult.extend`
  margin-top: ${props => props.theme.sizeSmall};
`;

// TODO: Think About Number of Results to Display
// TODO: Load More Results
// TODO: Artists

// TODO: Refactor mappings
// TODO: Album Playback From Search Results
