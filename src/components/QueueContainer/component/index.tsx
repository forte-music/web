import React from 'react';

import Title from '../../Title';
import { SongList } from '../../SongList';
import { DetailHeader } from '../../DetailRow';

import ConnectedDetailRow from '../../SongListContainer/Detail';

import styles from './styles.css';
import { QueueItem } from '../../../redux/state/queue';

interface Props {
  items: QueueItem[];
  nowPlaying?: QueueItem;
  skipToPosition: (position: number) => void;
}

const Queue = ({ items, nowPlaying, skipToPosition }: Props) => (
  <div>
    <Title segments={['Queue']} />

    <div className={styles.heading}>Queue</div>

    <div className={styles.body}>
      <SongList
        header={<DetailHeader />}
        countAvailableRows={items.length}
        renderItem={index => {
          const { id, songId } = items[index];

          return (
            <ConnectedDetailRow
              key={id}
              songId={songId}
              active={nowPlaying ? id === nowPlaying.id : false}
              onDoubleClick={() => skipToPosition(index)}
            />
          );
        }}
      />

      {!items.length && (
        <div className={styles.prompt}>
          It's pretty empty here. Try playing something.
        </div>
      )}
    </div>
  </div>
);

export default Queue;
