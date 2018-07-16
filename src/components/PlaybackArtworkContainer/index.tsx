import React from 'react';

import { Kind, QueueItemSource } from '../../redux/state/queue';
import PlaybackArtwork from '../PlaybackArtwork';
import { PlaybackArtworkState } from './enhancers/redux';

export interface Props {
  // The kind of list this is. Used to check whether the current playing
  // item is from this list. This information also passed to onStartPlayback.
  kind: Kind;

  // The id of this list. Used to check whether the current playing item is
  // from this list. This information is also passed to onStartPlayback.
  list: string;

  // A list of tracks to enqueue when play is pressed.
  tracks: QueueItemSource[];

  // See components/PlaybackArtwork.js.
  backgroundInteraction?: boolean;

  children: React.ReactNode;
}

// A connected playback artwork. It updates its state based on the current
// playing item and calls a prop when time to play more items.
const EnhancedComponent = ({
  kind,
  list,
  // A connected playback artwork. It updates its state based on the current
  // playing item and calls a prop when time to play more items.
  tracks,
  backgroundInteraction,
  children,
}: Props) => (
  <PlaybackArtworkState kind={kind} list={list} tracks={tracks}>
    {({ state, onPlaying, onPaused, onStartPlayback }) => (
      <PlaybackArtwork
        state={state}
        onPlaying={onPlaying}
        onPaused={onPaused}
        onStartPlayback={onStartPlayback}
        backgroundInteraction={backgroundInteraction}
      >
        {children}
      </PlaybackArtwork>
    )}
  </PlaybackArtworkState>
);

export default EnhancedComponent;
