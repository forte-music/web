// @flow
import React from 'react';
import type { Node } from 'react';
import VirtualList from 'react-virtual-list';

import styles from './SongList.css';
import { genRange } from '../../utils';

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

  // The header node is rendered inside the container above the virtual list
  // body.
  header: Node,

  // Called to render each row. Each row must be 36px tall.
  renderItem: ({ index: number }) => Node,
};

// TODO: Loading More Mechanism

const itemHeight = 36;

const SongList = ({
  countAvailableRows,
  totalItems,
  header,
  loadMore,
  renderItem,
}: Props) => (
  <div className={styles.container}>
    {header}

    {countAvailableRows && (
      <Virtualized
        items={Array.from(genRange(countAvailableRows))}
        itemHeight={itemHeight}
        renderItem={renderItem}
      />
    )}
  </div>
);

type ListProps<T> = {
  virtual: {
    style: Object,
    items: T[],
  },
  renderItem: ({ index: number }) => void,
};

const List = ({ virtual: { style, items }, renderItem }: ListProps<number>) => (
  <div style={style}>{items.map(item => renderItem({ index: item }))}</div>
);

const Virtualized = VirtualList()(List);

export default SongList;
