import React from 'react';
import styled from '../styled-components';

import Title from './Title';
import { PlaybackAlbumArtwork } from './PlaybackAlbumArtwork';
import { pluralize } from '../utils';
import { SongList } from './SongList';
import { formatDuration } from '../utils/duration';
import { AlbumRowHeader, AlbumRow } from './AlbumRow/index';
import { Container } from './Container';
import { ArtistLink } from './ArtistLink';

import { AlbumQuery_album } from './AlbumContainer/enhancers/__generated__/AlbumQuery';

export interface Props {
  album: AlbumQuery_album;
  onDoubleClick: (startIndex: number) => void;
  currentlyPlayingId?: string;
}

export const Album = (props: Props) => (
  <div>
    <Title segments={[props.album.name]} />

    <HeaderContainer>
      <Container>
        <HeaderContents>
          <ArtworkContainer>
            <PlaybackAlbumArtwork backgroundInteraction album={props.album} />
          </ArtworkContainer>

          <DetailsContainer>
            <Name>{props.album.name}</Name>
            <ArtistLinkContainer>
              <ArtistLink artist={props.album.artist} />
            </ArtistLinkContainer>

            <StatsContainer>
              {props.album.songs.length}{' '}
              {pluralize('song', props.album.songs.length)},{' '}
              {formatDuration(props.album.duration)}
            </StatsContainer>
          </DetailsContainer>
        </HeaderContents>
      </Container>
    </HeaderContainer>

    <SongsContainer>
      <Container>
        <SongList
          header={<AlbumRowHeader />}
          rows={props.album.songs}
          render={(song, index) => (
            <AlbumRow
              key={index}
              song={song}
              active={props.currentlyPlayingId === song.id}
              onDoubleClick={() => props.onDoubleClick(index)}
            />
          )}
        />
      </Container>
    </SongsContainer>
  </div>
);

const HeaderContainer = styled.div`
  background: ${props => props.theme.headerBackgroundColor};
`;

const HeaderContents = styled.div`
  padding: ${props => props.theme.sizeMedium};

  display: flex;
  flex-direction: row;
`;

const ArtworkContainer = styled.div`
  width: ${props => props.theme.artworkSize};
`;

const DetailsContainer = styled.div`
  flex: 1;

  display: flex;
  flex-direction: column;
  margin-left: ${props => props.theme.sizeMedium};
  margin-top: ${props => props.theme.sizeSmall};
`;

const Name = styled.div`
  color: ${props => props.theme.headerPrimaryTextColor};
  font-size: ${props => props.theme.fontSizeLarge};
`;

const ArtistLinkContainer = styled.div`
  margin-top: ${props => props.theme.sizeSmall};
  color: ${props => props.theme.headerSecondaryTextColor};
  font-size: ${props => props.theme.fontSizeMedium};
`;

const StatsContainer = styled.div`
  color: ${props => props.theme.headerTertiaryTextColor};
  margin-top: auto;
  font-size: ${props => props.theme.fontSizeTiny};
  align-self: flex-end;
`;

const SongsContainer = styled.div`
  margin-top: ${props => props.theme.sizeSmall};
  margin-bottom: ${props => props.theme.sizeSmall};
`;
