import React from 'react';

import { QueueItemSource } from '../../redux/state/queue';
import { PlaybackArtwork } from '../PlaybackArtwork';
import { PlaybackArtworkReduxState } from './enhancers/redux';
import { PlaybackArtworkState } from './enhancers/state';
import { CheckPlayingFromFn } from '../../redux/selectors/nowPlaying';

export interface Props {
  // Gets a list tracks to enqueue. Called when play is pressed.
  getTracks: () => Promise<QueueItemSource[]>;

  // Used to check whether the currently playing item is from the current list.
  checkPlayingFrom: CheckPlayingFromFn;

  // See components/PlaybackArtwork
  handlesBackgroundInteraction: boolean;

  children: React.ReactNode;
}

// A connected playback artwork. It updates its state based on the current
// playing item and calls a prop when time to play more items.
export const PlaybackArtworkContainer = (props: Props) => (
  <PlaybackArtworkState>
    {state => (
      <PlaybackArtworkReduxState
        checkPlayingFrom={props.checkPlayingFrom}
        getTracks={props.getTracks}
        isLoading={state.isLoading}
        setLoading={state.setLoading}
      >
        {redux => (
          <PlaybackArtwork
            state={redux.state}
            onPlaying={redux.onPlaying}
            onPaused={redux.onPaused}
            onStartPlayback={redux.onStartPlayback}
            handlesBackgroundInteraction={props.handlesBackgroundInteraction}
          >
            {props.children}
          </PlaybackArtwork>
        )}
      </PlaybackArtworkReduxState>
    )}
  </PlaybackArtworkState>
);
