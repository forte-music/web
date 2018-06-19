import * as React from 'react';

import PlaybackButton from '../PlaybackButton';
import SkipBackwards from '../icons/SkipBackwards';
import SkipForwards from '../icons/SkipForwards';

import * as styles from './PlaybackControls.css';

interface PlaybackControlsProps {
  // Whether or not the button center button is in the playing state
  // (showing the pause button).
  playing: boolean;

  // Called when the center button is clicked.
  onTogglePlayback: () => void;

  // Whether or not the buttons are disabled. When the buttons are disabled,
  // they can't be pressed and they display a different style.
  disabled: boolean;

  // Called when the skip ahead button is clicked.
  next: () => void;

  // Called when the skip backwards button is clicked.
  previous: () => void;
}

const PlaybackControls = ({
  playing,
  disabled,
  onTogglePlayback,
  next,
  previous,
}: PlaybackControlsProps) => {
  // Renders the play button when disabled, otherwise renders based on the
  // state of playing.
  const playingWithDisabled = !disabled && playing;

  return (
    <div
      className={[styles.container, disabled ? styles.disabled : ''].join(' ')}
    >
      <div onClick={previous} className={styles.secondary}>
        <SkipBackwards pathClass={styles.path} />
      </div>
      <PlaybackButton
        containerClass={styles.primary}
        playing={playingWithDisabled}
        onToggle={onTogglePlayback}
        pathClass={styles.path}
      />
      <div onClick={next} className={styles.secondary}>
        <SkipForwards pathClass={styles.path} />
      </div>
    </div>
  );
};

export default PlaybackControls;
