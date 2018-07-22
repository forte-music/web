import React from 'react';
import Title from '../../Title';
import { Song as DetailRowSong } from '../../DetailRow/Row';

import styles from '../../QueueContainer/component/styles.css';
import { DetailRow, DetailRowHeader } from '../../DetailRow';
import { noop } from '../../../utils';
import { SongList } from '../../SongList';
import { SortBy } from '../enhancers/__generated__/SongsQuery';

interface Song extends DetailRowSong {
  id: string;
}

interface Props {
  songs: Song[];
  hasMore: boolean;
  loadMore: () => Promise<void>;

  sortedBy: SortBy;
  setSortedBy: (newSort: SortBy) => void;

  setReversed: (newReverse: boolean) => void;
  isReversed: boolean;
}

// TODO: Loading More
// TODO: Sorting
// TODO: Reversing
// TODO: On Double Click
// TODO: Active
// TODO: Style Hoisting

const Songs = (props: Props) => (
  <div>
    <Title segments={['Songs']} />

    <div className={styles.heading}>Songs</div>

    <div className={styles.body}>
      <SongList
        countAvailableRows={props.songs.length}
        header={<DetailRowHeader />}
        renderItem={index => (
          <DetailRow
            key={index}
            song={props.songs[index]}
            active={false}
            onDoubleClick={noop}
          />
        )}
      />
    </div>
  </div>
);

export default Songs;
