// @flow
import React from 'react';
import type { Node } from 'react';
import VirtualList from 'react-tiny-virtual-list';
import Measure from 'react-measure';

import styles from './SongList.css';

type Props = {
  // The number of rows to render.
  count: number,

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

  // Called to render each row.
  renderItem: ({ index: number, style: Object }) => Node,
};

const SongList = ({
  count,
  loadMore,
  totalItems,
  className = '',
  header,
  renderItem,
}: Props) => (
  <div className={styles.container}>
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
              if (count >= totalItems) {
                // No additional items to fetch.
                return;
              }

              const lastIndex = count - 1;
              if (startIndex >= lastIndex || stopIndex >= lastIndex) {
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
