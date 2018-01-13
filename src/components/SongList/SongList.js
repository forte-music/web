// @flow
import React from 'react';
import type { Node } from 'react';
import VirtualList from 'react-tiny-virtual-list';
import Measure from 'react-measure';

type Props = {
  // The number of rows currently available to render by calls to
  // renderItem. If rows need to be rendered which exceed this number,
  // loadMore will be called first.
  countAvailableRows: number,

  // Called when it is time to load more ids. This function should update
  // the value of the prop ids passed into this component.
  loadMore: () => void,

  // The total number of expected items. This is used to know when to stop
  // loading in new data.
  totalItems: number,

  // Class for the div container the song list and header.
  rootClassName?: string,

  // Class to size the wrapping div of the virtual list.
  className?: string,

  // The header node is rendered inside the container above the virtual list
  // body.
  header: Node,

  // Called to render each row. Each row must be 36px tall.
  renderItem: ({ index: number, style: Object }) => Node,
};

const SongList = ({
  countAvailableRows,
  loadMore,
  totalItems,
  className = '',
  header,
  renderItem,
  rootClassName,
}: Props) => (
  <div className={rootClassName}>
    {header}
    <Measure bounds>
      {({ measureRef, contentRect: { bounds: { height, width } } }) => (
        <div ref={measureRef} className={className}>
          <VirtualList
            height={height || 100}
            width={width}
            itemCount={countAvailableRows}
            itemSize={36}
            onItemsRendered={({ startIndex, stopIndex }) => {
              if (countAvailableRows >= totalItems) {
                // No additional items to fetch.
                return;
              }

              const lastLoadedIndex = countAvailableRows - 1;
              if (
                startIndex >= lastLoadedIndex ||
                stopIndex >= lastLoadedIndex
              ) {
                loadMore();
              }
            }}
            renderItem={renderItem}
          />
        </div>
      )}
    </Measure>
  </div>
);

export default SongList;
