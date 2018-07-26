import React from 'react';
import { SongList } from '../SongList';

interface Props<T> {
  // Passed to SongList.
  header: React.ReactNode;

  // Called with values from [0, rows) to render a node for each row. Each
  // row must be 36px tall.
  render: (item: T, index: number) => React.ReactNode;

  // Node to display at the bottom of the list when there are more items
  // left while fetchMoreRows is being called.
  loading: React.ReactNode;

  // Passed to SongList.
  rows: T[];

  // True if more rows can be fetched by calling fetchMoreRows.
  hasMoreRows: boolean;

  // Call to fetch more rows.
  loadMoreRows: () => void;

  // Whether or not more rows are being loaded. When rows are being loaded,
  // requesting more rows is disabled.
  isLoadingMore: boolean;
}

type ItemContainer<T> = { loadingRow: false; item: T } | { loadingRow: true };

export function InfiniteSongList<T>(props: Props<T>) {
  const rows = props.rows.map((item: T): ItemContainer<T> => ({
    item,
    loadingRow: false,
  }));

  if (props.hasMoreRows) {
    rows.push({ loadingRow: true });
  }

  return (
    <SongList
      header={props.header}
      rows={rows}
      render={(item, index) => {
        if (item.loadingRow && !props.isLoadingMore) {
          props.loadMoreRows();
        }

        if (item.loadingRow) {
          return <React.Fragment key={index}>{props.loading}</React.Fragment>;
        }

        return (
          <React.Fragment key={index}>
            {props.render(item.item, index)}
          </React.Fragment>
        );
      }}
    />
  );
}
