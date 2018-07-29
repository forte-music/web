import React from 'react';

import { QueueItemSource } from '../../redux/state/queue';
import { PlaybackArtwork } from '../PlaybackArtwork';
import { PlaybackArtworkState } from './enhancers/redux';
import { CheckPlayingFromFn } from '../../redux/selectors/nowPlaying';

export interface Props {
  // A list of tracks to enqueue when play is pressed.
  tracks: QueueItemSource[];

  // Used to check whether the currently playing item is from the current list.
  checkPlayingFrom: CheckPlayingFromFn;

  // See components/PlaybackArtwork
  handlesBackgroundInteraction: boolean;

  children: React.ReactNode;
}

// A connected playback artwork. It updates its state based on the current
// playing item and calls a prop when time to play more items.
const EnhancedComponent = (props: Props) => (
  <PlaybackArtworkState
    checkPlayingFrom={props.checkPlayingFrom}
    tracks={props.tracks}
  >
    {({ state, onPlaying, onPaused, onStartPlayback }) => (
      <PlaybackArtwork
        state={state}
        onPlaying={onPlaying}
        onPaused={onPaused}
        onStartPlayback={onStartPlayback}
        handlesBackgroundInteraction={props.handlesBackgroundInteraction}
      >
        {props.children}
      </PlaybackArtwork>
    )}
  </PlaybackArtworkState>
);

export default EnhancedComponent;
