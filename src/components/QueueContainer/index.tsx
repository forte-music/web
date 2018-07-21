import React from 'react';
import Queue from './component';
import { QueueState } from './enhancers/redux';

const QueueContainer = () => (
  <QueueState>
    {({ items, nowPlayingId, skipToPosition }) => (
      <Queue
        items={items}
        nowPlayingId={nowPlayingId}
        skipToPosition={skipToPosition}
      />
    )}
  </QueueState>
);

export default QueueContainer;
