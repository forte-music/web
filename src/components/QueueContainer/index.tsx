import React from 'react';
import { QueuePage } from './component';
import { QueueState } from './enhancers/redux';

const QueueContainer = () => (
  <QueueState>
    {({ items, nowPlayingId, skipToPosition }) => (
      <QueuePage
        items={items}
        nowPlayingId={nowPlayingId}
        skipToPosition={skipToPosition}
      />
    )}
  </QueueState>
);

export default QueueContainer;
