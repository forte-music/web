import React from 'react';
import styled from '../styled-components';
import { AlbumLink, Album } from './AlbumLink';
import { Artist, InlineArtistsList } from './InlineArtistsList';
import { Column, RowContainer, TableHeader } from './BaseSongTable';
import { FormattedDuration } from './FormattedDuration';

export interface Props {
  song?: Song;
  active: boolean;
  onDoubleClick?: () => void;
}

export const DetailRow = (props: Props) => (
  <RowContainer isActive={props.active} onDoubleClick={props.onDoubleClick}>
    <SongColumn isLoading={!props.song}>
      {props.song && props.song.name}
    </SongColumn>
    <AlbumColumn isLoading={!props.song}>
      {props.song && <AlbumLink album={props.song.album} />}
    </AlbumColumn>
    <ArtistsColumn isLoading={!props.song}>
      {props.song && <InlineArtistsList artists={props.song.artists} />}
    </ArtistsColumn>
    <DurationColumn isLoading={!props.song}>
      {props.song && <FormattedDuration duration={props.song.duration} />}
    </DurationColumn>
  </RowContainer>
);

export const DetailRowHeader = () => (
  <TableHeader>
    <SongColumn>Name</SongColumn>
    <AlbumColumn>Album</AlbumColumn>
    <ArtistsColumn>Artists</ArtistsColumn>
    <DurationColumn>Duration</DurationColumn>
  </TableHeader>
);

export interface Song {
  name: string;
  duration: number;
  album: Album;
  artists: Artist[];
}

export const SongColumn = styled(Column)`
  flex: 2;
`;

export const AlbumColumn = styled(Column)`
  flex: 2;
`;

export const ArtistsColumn = styled(Column)`
  flex: 2;
`;

export const DurationColumn = styled(Column)`
  flex: 1;
`;
