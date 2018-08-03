import React from 'react';

import { Column, TableHeader, RowContainer } from './BaseSongTable';
import { Artist, InlineArtistsList } from './InlineArtistsList';
import { FormattedDuration } from './FormattedDuration';

interface Props {
  // When this is undefined, the component is in a loading state.
  song?: Song;

  // Whether or not the current item should be styled as if it is active.
  // Defaults to false.
  active: boolean;

  // Called when the component is double clicked.
  onDoubleClick?: () => void;
}

export const AlbumRow = (props: Props) => (
  <RowContainer isActive={props.active} onDoubleClick={props.onDoubleClick}>
    <TrackNumberColumn isLoading={!props.song}>
      {props.song && props.song.trackNumber}
    </TrackNumberColumn>
    <NameColumn isLoading={!props.song}>
      {props.song && props.song.name}
    </NameColumn>

    <ArtistsColumn isLoading={!props.song}>
      {props.song && <InlineArtistsList artists={props.song.artists} />}
    </ArtistsColumn>

    <DurationColumn isLoading={!props.song}>
      {props.song && <FormattedDuration duration={props.song.duration} />}
    </DurationColumn>
  </RowContainer>
);

export const AlbumRowHeader = () => (
  <TableHeader>
    <TrackNumberColumn>#</TrackNumberColumn>
    <NameColumn>Name</NameColumn>
    <ArtistsColumn>Artists</ArtistsColumn>
    <DurationColumn>Duration</DurationColumn>
  </TableHeader>
);

interface Song {
  name: string;
  duration: number;
  trackNumber: number;
  artists: Artist[];
}

const TrackNumberColumn = Column.extend``;

const NameColumn = Column.extend`
  flex: 5;
`;

const ArtistsColumn = Column.extend`
  flex: 1;
`;

const DurationColumn = Column.extend`
  flex: 1;
`;
