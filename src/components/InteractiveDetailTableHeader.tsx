import React from 'react';
import { TableHeader } from './BaseSongTable';
import Chevron from './icons/Chevron';
import {
  AlbumColumn,
  ArtistsColumn,
  DurationColumn,
  SongColumn,
} from './DetailSongTable';

import styled from '../styled-components';
import { SortBy } from '../__generated__/globalTypes';

interface HeaderProps {
  isReverse: boolean;
  setReverse: (newReverse: boolean) => void;

  sortBy: SortBy;
  setSortBy: (newSortBy: SortBy) => void;
}

export const InteractiveDetailTableHeader = (props: HeaderProps) => (
  <TableHeader>
    <SortedColumn forSortBy={SortBy.LEXICOGRAPHICALLY} {...props}>
      Name
    </SortedColumn>
    <AlbumColumn>Album</AlbumColumn>
    <ArtistsColumn>Artists</ArtistsColumn>
    <DurationColumn>Duration</DurationColumn>
  </TableHeader>
);

interface SortedColumnProps extends HeaderProps {
  forSortBy: SortBy;
  className?: string;
  children: React.ReactNode;
}

const chevronSvgClass = 'chevronSvgClass';

const SortedColumn = (props: SortedColumnProps) => (
  <SongColumnSorted
    className={props.className}
    isCurrentlySortedBy={props.sortBy === props.forSortBy}
    isReversed={props.isReverse}
    onClick={() => handleColumnClick(props)}
  >
    {props.children}
    <Chevron svgClass={chevronSvgClass} />
  </SongColumnSorted>
);

const handleColumnClick = (props: SortedColumnProps) => {
  if (props.sortBy === props.forSortBy) {
    props.setReverse(!props.isReverse);
  } else {
    props.setReverse(false);
    props.setSortBy(props.forSortBy);
  }
};

interface SongColumnSortedProps {
  isCurrentlySortedBy: boolean;
  isReversed: boolean;
}

const SongColumnSorted = styled(SongColumn)<SongColumnSortedProps>`
  position: relative;

  & .${chevronSvgClass} {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;

    height: 16px;

    transform: rotate(${props => (props.isReversed ? -90 : 90)}deg);
    visibility: ${props => (props.isCurrentlySortedBy ? 'visible' : 'hidden')};
  }
`;
