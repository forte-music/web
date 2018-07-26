import React, { ReactNode } from 'react';
import VirtualList, {
  DefaultState,
  OwnProps,
  VirtualProps,
} from 'react-virtual-list';

import styles from './styles.css';

interface Props<T> {
  // The header node is rendered inside the container above the virtual list
  // body.
  header: ReactNode;

  // The data to be rendered in the list.
  rows: T[];

  // Called to render each row. Each row must be 36px tall.
  render: (item: T, index: number) => ReactNode;
}

const itemHeight = 36;

export function SongList<T>(props: Props<T>) {
  return (
    <div className={styles.container}>
      {props.header}

      {props.rows.length > 0 && (
        <Virtualized
          items={props.rows.map((item, index) => ({ item, index }))}
          itemHeight={itemHeight}
          renderItem={({ item, index }) => props.render(item, index)}
        />
      )}
    </div>
  );
}

interface ChildProps<T> extends VirtualProps<T>, RenderItem<T> {}

function List<T>(props: ChildProps<T>) {
  return (
    <div style={props.virtual.style}>
      {props.virtual.items.map(item => props.renderItem(item))}
    </div>
  );
}

interface VirtualizedProps<T> extends OwnProps<T>, RenderItem<T> {}

interface RenderItem<T> {
  renderItem: (item: T) => React.ReactNode;
}

const Virtualized: React.ComponentType<VirtualizedProps<any>> = VirtualList<
  any,
  VirtualProps<any>,
  DefaultState
>()(List);
