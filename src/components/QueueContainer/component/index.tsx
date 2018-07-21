import React from 'react';

import Title from '../../Title';
import { SongList } from '../../SongList';
import { DetailRowHeader } from '../../DetailRow';

import ConnectedDetailRow from '../../SongListContainer/Detail';

import styles from './styles.css';
import { QueueItem } from '../../../redux/state/queue';

interface Props {
  items: QueueItem[];
  nowPlayingId?: string;
  skipToPosition: (position: number) => void;
}

const Queue = ({ items, nowPlayingId, skipToPosition }: Props) => (
  <div>
    <Title segments={['Queue']} />

    <div className={styles.heading}>Queue</div>

    <div className={styles.body}>
      <SongList
        header={<DetailRowHeader />}
        countAvailableRows={items.length}
        renderItem={index => {
          const { id, songId } = items[index];

          return (
            <ConnectedDetailRow
              key={id}
              songId={songId}
              active={id === nowPlayingId}
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
