import React from 'react';
import Title from '../../Title';

import styles from '../../QueueContainer/component/styles.css';
import { Row as DetailRow, Song } from '../../DetailRow/Row';
import { noop } from '../../../utils';
import { SortBy } from '../enhancers/__generated__/SongsQuery';
import { InteractiveDetailRowHeader } from './InteractiveDetailRowHeader';
import { InfiniteSongList } from '../../InfiniteSongList';
import { LoadingRow } from '../../LoadingRow';

interface Props {
  songs: Song[];
  hasMore: boolean;
  loadMore: () => void;
  isLoadingMore: boolean;

  sortBy: SortBy;
  setSortBy: (newSort: SortBy) => void;

  setReverse: (newReverse: boolean) => void;
  isReverse: boolean;
}

// TODO: Tune Page Sizing and Loading More
// TODO: On Double Click
// TODO: Active
// TODO: Style Hoisting
// TODO: Song List Width Growing Too Much

const Songs = (props: Props) => (
  <div>
    <Title segments={['Songs']} />

    <div className={styles.heading}>Songs</div>

    <div className={styles.body}>
      <InfiniteSongList
        rows={props.songs}
        hasMoreRows={props.hasMore}
        loadMoreRows={props.loadMore}
        isLoadingMore={props.isLoadingMore}
        render={song => (
          <DetailRow song={song} active={false} onDoubleClick={noop} />
        )}
        loading={<LoadingRow />}
        header={
          <InteractiveDetailRowHeader
            sortBy={props.sortBy}
            setSortBy={props.setSortBy}
            isReverse={props.isReverse}
            setReverse={props.setReverse}
          />
        }
      />
    </div>
  </div>
);

export default Songs;
