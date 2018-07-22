import React from 'react';
import Title from '../../Title';
import { Song as DetailRowSong } from '../../DetailRow/Row';

import styles from '../../QueueContainer/component/styles.css';
import { DetailRow } from '../../DetailRow';
import { noop } from '../../../utils';
import { SongList } from '../../SongList';
import { SortBy } from '../enhancers/__generated__/SongsQuery';
import { InteractiveDetailRowHeader } from './InteractiveDetailRowHeader';

interface Song extends DetailRowSong {
  id: string;
}

interface Props {
  songs: Song[];
  hasMore: boolean;
  loadMore: () => Promise<void>;

  sortBy: SortBy;
  setSortBy: (newSort: SortBy) => void;

  setReverse: (newReverse: boolean) => void;
  isReverse: boolean;
}

// TODO: Loading More
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
        header={
          <InteractiveDetailRowHeader
            sortBy={props.sortBy}
            setSortBy={props.setSortBy}
            isReverse={props.isReverse}
            setReverse={props.setReverse}
          />
        }
        renderItem={index => (
          <DetailRow
            key={index}
            song={props.songs[index] as DetailRowSong}
            active={false}
            onDoubleClick={noop}
          />
        )}
      />
    </div>
  </div>
);

export default Songs;
