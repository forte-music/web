import * as React from 'react';
import VirtualList, { InputProps } from 'react-virtual-list';

import * as styles from './SongList.css';
import { genRange } from '../../utils';

interface Props {
  // The number of rows currently available to render by calls to
  // renderItem. If rows need to be rendered which exceed this number,
  // loadMore will be called first.
  countAvailableRows: number;

  // Called when it is time to load more ids. This function should update
  // the value of the prop ids passed into this component.
  loadMore: () => void;

  // The total number of expected items. This is used to know when to stop
  // loading in new data.
  totalItems: number;

  // The header node is rendered inside the container above the virtual list
  // body.
  header: React.ReactNode;

  // Called to render each row. Each row must be 36px tall.
  renderItem: (index: number) => React.ReactNode;
}

// TODO: Loading More Mechanism

const itemHeight = 36;

const SongList = ({ countAvailableRows, header, renderItem }: Props) => (
  <div className={styles.container}>
    {header}

    {countAvailableRows > 0 && (
      <Virtualized
        items={Array.from(genRange(countAvailableRows))}
        itemHeight={itemHeight}
        renderItem={({ index }) => renderItem(index)}
      />
    )}
  </div>
);

interface ListProps<T> {
  virtual: {
    style: object;
    items: T[];
  };
  renderItem: (item: { index: number }) => void;
}

const List = ({ virtual: { style, items }, renderItem }: ListProps<number>) => (
  <div style={style}>{items.map(item => renderItem({ index: item }))}</div>
);

const Virtualized = VirtualList<
  InputProps<number> & { renderItem: (item: { index: number }) => void }
>()(List);

export default SongList;
