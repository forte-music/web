import React from 'react';
import styled from '../../styled-components';

import { InlineArtistsList } from '../InlineArtistsList';
import { AlbumLink } from '../AlbumLink';
import { AlbumArtwork } from '../AlbumArtwork';
import { SingleLine } from '../styled/SingleLine';

import { sizes, withPx } from '../../theme';
import { Song } from '../FooterContainer/enhancers/query';

interface Props {
  song: Song;
}

export const NowPlaying = ({ song }: Props) => (
  <NowPlayingContainer>
    <ArtworkContainer>
      <AlbumArtwork album={song.album} />
    </ArtworkContainer>

    <MetadataContainer>
      <SongTitle>{song.name}</SongTitle>
      <SongDetail>
        <InlineArtistsList artists={song.artists} />
        {' - '}
        <AlbumLink album={song.album} />
      </SongDetail>
    </MetadataContainer>
  </NowPlayingContainer>
);

const footerArtworkSize = 90;

export const NowPlayingContainer = styled.div`
  flex: 1;
  min-width: ${withPx(footerArtworkSize + sizes.veryTiny)};
  display: flex;
  align-items: center;
`;

const ArtworkContainer = styled.div`
  min-width: ${withPx(footerArtworkSize)};
  width: ${withPx(footerArtworkSize)};
  height: ${withPx(footerArtworkSize)};
`;

const MetadataContainer = styled.div`
  margin-left: ${props => props.theme.sizeTiny};

  /* Needed for text overflow */
  min-width: 0;
`;

const SongTitle = SingleLine.extend`
  color: ${props => props.theme.footerSongTitleTextColor};
  font-size: ${props => props.theme.fontSizeTiny};
`;

const SongDetail = SingleLine.extend`
  color: ${props => props.theme.footerSongDetailTextColor};
  font-size: ${props => props.theme.fontSizeVeryTiny};
  margin-top: ${props => props.theme.sizeVeryTiny};
`;
