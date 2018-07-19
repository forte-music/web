import React from 'react';
import Queue from './component';
import { QueueState } from './enhancers/redux';

const QueueContainer = () => (
  <QueueState>
    {({ items, nowPlaying, skipToPosition }) => (
      <Queue
        items={items}
        nowPlaying={nowPlaying}
        skipToPosition={skipToPosition}
      />
    )}
  </QueueState>
);

export default QueueContainer;
