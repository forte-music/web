// @flow
import React from 'react';

import Title from '../../components/Title';
import { SongList, DetailHeader as Header } from '../../components/SongList';

import ConnectedDetailRow from '../SongList/Detail';

import styles from './Queue.css';
import type { EnhancedProps } from '.';

const Queue = ({ items, nowPlaying, skipToPosition }: EnhancedProps) => (
  <div>
    <Title segments={['Queue']} />

    <div className={styles.heading}>Queue</div>

    <div className={styles.body}>
      <SongList
        loadMore={() => {}}
        header={<Header />}
        totalItems={items.length}
        countAvailableRows={items.length}
        renderItem={({ index }) => {
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
