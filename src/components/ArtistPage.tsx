import React from 'react';
import styled from '../styled-components';

import { PlaybackAlbumArtwork } from './PlaybackAlbumArtwork';
import { ArtworkTwoInfo } from './ArtworkTwoInfo';
import Title from './Title';
import { AlbumLink } from './AlbumLink';
import { Container } from './Container';
import { Pluralize } from './Pluralize';
import { HeaderContainer } from './styled/HeaderContainer';
import { Heading } from './styled/Heading';
import { Contents } from './styled/Contents';
import { ArtworkGridContents } from './styled/ArtworkGridContents';

import { ArtistQuery_artist as Artist } from './ArtistContainer/enhancers/__generated__/ArtistQuery';

export interface Props {
  artist: Artist;
}

export const ArtistPage = (props: Props) => (
  <div>
    <Title segments={[props.artist.name]} />
    <HeaderContainer>
      <Container>
        <Contents>
          <Heading>{props.artist.name}</Heading>

          <SecondaryInfoContainer>
            <Pluralize singular={'album'} items={props.artist.albums} />
          </SecondaryInfoContainer>
        </Contents>
      </Container>
    </HeaderContainer>

    <Container>
      <ArtworkGridContents>
        {props.artist.albums.map(album => (
          <ArtworkTwoInfo
            key={album.id}
            artwork={<PlaybackAlbumArtwork album={album} />}
            lineOne={<AlbumLink album={album} />}
            lineTwo={album.releaseYear}
          />
        ))}
      </ArtworkGridContents>
    </Container>
  </div>
);

const SecondaryInfoContainer = styled.div`
  margin-top: ${props => props.theme.sizeTiny};
  color: ${props => props.theme.headerSecondaryTextColor};
  font-size: ${props => props.theme.fontSizeTiny};
`;
