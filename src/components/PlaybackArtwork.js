// @flow
import React from 'react';
import type { Node } from 'react';

import PlaybackButton from './PlaybackButton';

import {
  container as containerClass,
  children as childrenClass,
  button as buttonClass,
  overlay as overlayClass,
  path as pathClass,
  buttonBackdrop as buttonBackdropClass,
} from './PlaybackArtwork.css';

type PlaybackState =
  // In this state a playing indicator is shown. onPaused is called when the
  // indicator is pressed.
  | 'PLAYING'

  // In this state a paused indicator is shown. onPlaying is called when the
  // indicator is pressed.
  | 'PAUSED';

type Props = {
  // The child node will be rendered under the playing cover.
  children: Node,

  // The current state of playback.
  state: PlaybackState,

  // Called when the playback state should change from PAUSED to PLAYING.
  onPlaying: () => void,

  // Called when the playback state should change from PLAYING to PAUSED.
  onPaused: () => void,
};

// An which renders an overlay of the current playing state atop an element
// (usually Artwork or a Collage) and reacts to events.
const PlaybackArtwork = ({ children, state, onPlaying, onPaused }: Props) => (
  <div className={containerClass}>
    <div className={childrenClass}>{children}</div>

    {/* Tints the children but still allows pointer events through. */}
    <div className={overlayClass} />

    {/* The play/pause button in the bottom right corner. */}
    <div className={buttonBackdropClass}>
      <PlaybackButton
        svgClass={buttonClass}
        pathClass={pathClass}
        playing={state === 'PLAYING'}
        onToggle={() => {
          if (state === 'PLAYING') {
            onPaused();
          } else if (state === 'PAUSED') {
            onPlaying();
          }
        }}
      />
    </div>
  </div>
);

export default PlaybackArtwork;
