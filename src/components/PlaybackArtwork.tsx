import * as React from 'react';
import * as styles from './PlaybackArtwork.css';

import PlaybackButton from './PlaybackButton';

export type PlaybackState =
  // In this state, a play button is shown on hover. onStartPlayback is
  // called when the button is pressed.
  | 'STOPPED'

  // In this state, a loading indicator is shown. No interaction can happen
  // in this state.
  | 'LOADING'

  // In this state a playing indicator is shown. onPaused is called when the
  // indicator is pressed.
  | 'PLAYING'

  // In this state a paused indicator is shown. onPlaying is called when the
  // indicator is pressed.
  | 'PAUSED';

interface Props {
  // The child node will be rendered under the playing cover.
  children?: React.ReactNode;

  // Whether or not to handle clicks on the background. This is false by
  // default to allow parent components to handle click through.
  backgroundInteraction?: boolean;

  // The current state of playback.
  state: PlaybackState;

  // Called when the playback state should change from PAUSED to PLAYING.
  onPlaying: () => void;

  // Called when the playback state should change from PLAYING to PAUSED.
  onPaused: () => void;

  // Called when the playback state should change from STOPPED to PLAYING.
  onStartPlayback: () => void;
}

// An which renders an overlay of the current playing state atop an element
// (usually Artwork or a Collage) and reacts to events.
const PlaybackArtwork = ({
  backgroundInteraction,
  children,
  state,
  onPlaying,
  onPaused,
  onStartPlayback,
}: Props) => (
  <div
    className={[
      styles.container,
      state !== 'STOPPED' ? styles.active : '',
      backgroundInteraction ? styles.backgroundInteraction : '',
    ].join(' ')}
  >
    <div className={styles.children}>{children}</div>

    {/* Tints the children but still allows pointer events through. */}
    <div
      className={styles.overlay}
      onClick={() => handleUpdate(state, onPaused, onPlaying, onStartPlayback)}
    />

    {/* The play/pause button in the bottom right corner. */}
    <div className={styles.buttonBackdrop}>
      <PlaybackButton
        pathClass={styles.path}
        playing={state === 'PLAYING'}
        onToggle={() =>
          handleUpdate(state, onPaused, onPlaying, onStartPlayback)
        }
      />
    </div>
  </div>
);

const handleUpdate = (
  state: PlaybackState,
  onPaused: () => void,
  onPlaying: () => void,
  onStartPlayback: () => void
) => {
  if (state === 'PLAYING') {
    onPaused();
  } else if (state === 'PAUSED') {
    onPlaying();
  } else if (state === 'STOPPED') {
    onStartPlayback();
  }
};

export default PlaybackArtwork;
