import React from 'react';
import styled from '../styled-components';

import Title from './Title';
import { PlaybackAlbumArtwork } from './PlaybackAlbumArtwork';
import { SongList } from './SongList';
import { AlbumRow, AlbumRowHeader } from './AlbumRow/index';
import { Container } from './Container';
import { ArtistLink } from './ArtistLink';
import { HeaderContainer } from './styled/HeaderContainer';
import { Contents } from './styled/Contents';
import { Heading } from './styled/Heading';
import { Pluralize } from './Pluralize';
import { FormattedDuration } from './FormattedDuration';

import { AlbumQuery_album as Album } from './AlbumContainer/enhancers/__generated__/AlbumQuery';

export interface Props {
  album: Album;
  onDoubleClick: (startIndex: number) => void;
  currentlyPlayingId?: string;
}

export const AlbumPage = (props: Props) => (
  <div>
    <Title segments={[props.album.name]} />

    <HeaderContainer>
      <Container>
        <AlbumHeaderContents>
          <ArtworkContainer>
            <PlaybackAlbumArtwork backgroundInteraction album={props.album} />
          </ArtworkContainer>

          <DetailsContainer>
            <Heading>{props.album.name}</Heading>
            <ArtistLinkContainer>
              <ArtistLink artist={props.album.artist} />
            </ArtistLinkContainer>

            <StatsContainer>
              <Pluralize singular={'song'} items={props.album.songs} />
              {', '}
              <FormattedDuration duration={props.album.duration} />
            </StatsContainer>
          </DetailsContainer>
        </AlbumHeaderContents>
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

const AlbumHeaderContents = Contents.extend`
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
