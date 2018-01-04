// @flow
import React from 'react';
import type { Node, ComponentType } from 'react';

import VirtualList from 'react-tiny-virtual-list';
import Measure from 'react-measure';

import { formatDuration } from '../utils';
import type { Song } from '../model';

import {
  container as containerClass,
  header as headerClass,
  row as rowClass,
  song as songClass,
  artist as artistClass,
  album as albumClass,
  duration as durationClass,
} from './SongList.css';

type RowProps = {
  // The song to render a row for.
  id: string,

  // The index of the row.
  index: number,
};

type Props = {
  // A list of ids which are passed to the inner component. The inner
  // component is responsible for resolving the data into a component.
  ids: string[],

  // Called when it is time to load more ids. This function should update
  // the value of the prop ids passed into this component.
  loadMore: () => void,

  // The total number of expected items. This is used to know when to stop
  // loading in new data.
  totalItems: number,

  // Class to size the wrapping div of the virtual list.
  className?: string,

  // The header node is rendered inside the container above the virtual list
  // body.
  header: Node,

  // A component rendering a row of the table.
  row: ComponentType<RowProps>,
};

const SongList = ({
  ids,
  loadMore,
  totalItems,
  className = '',
  header,
  row: Row,
}: Props) => (
  <div className={containerClass}>
    {header}

    <Measure bounds>
      {({ measureRef, contentRect: { bounds: { height, width } } }) => (
        <div ref={measureRef} className={className}>
          <VirtualList
            height={height || 100}
            width={width}
            itemCount={totalItems}
            itemSize={25}
            onItemsRendered={({ startIndex, stopIndex }) => {
              if (ids.length >= totalItems) {
                // No additional items to fetch.
                return;
              }

              const lastIndex = ids.length - 1;
              if (startIndex >= lastIndex || stopIndex >= lastIndex) {
                loadMore();
              }
            }}
            renderItem={({ index, style }) => {
              const id = ids[index];
              return (
                <div key={id} style={style}>
                  <Row id={id} index={index} />
                </div>
              );
            }}
          />
        </div>
      )}
    </Measure>
  </div>
);

export const DetailHeader = () => (
  <div className={headerClass}>
    <span className={songClass}>Name</span>
    <span className={albumClass}>Album</span>
    <span className={artistClass}>Artist</span>
    <span className={durationClass}>Duration</span>
  </div>
);

type SongRowProps = {
  song: Song,
};

export const DetailRow = ({ song }: SongRowProps) => (
  <div className={rowClass}>
    <span className={songClass}>{song.name}</span>
    <span className={albumClass}>{song.album.name}</span>
    <span className={artistClass}>{song.album.artist.name}</span>
    <span className={durationClass}>{formatDuration(song.duration)}</span>
  </div>
);

export default SongList;
