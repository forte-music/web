import React, { ReactNode } from 'react';
import VirtualList, { InputProps } from 'react-virtual-list';

import styles from './SongList.css';
import { genRange } from '../../utils';

interface Props {
  // The number of rows currently available to render by calls to
  // renderItem.
  countAvailableRows: number;

  // The header node is rendered inside the container above the virtual list
  // body.
  header: ReactNode;

  // Called to render each row. Each row must be 36px tall.
  renderItem: (index: number) => ReactNode;
}

const itemHeight = 36;

export const SongList = ({ countAvailableRows, header, renderItem }: Props) => (
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
