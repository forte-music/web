// @flow
import React from 'react';

import PlaybackButton from '../../components/PlaybackButton';
import SkipBackwards from '../../icons/SkipBackwards';
import SkipForwards from '../../icons/SkipForwards';

import {
  primary as primaryClass,
  secondary as secondaryClass,
  container as containerClass,
  path as pathClass,
  disabled as disabledClass,
} from './PlaybackControls.css';

type PlaybackControlsProps = {
  // Whether or not the button center button is in the playing state
  // (showing the pause button).
  playing: boolean,

  // Called when the center button is clicked.
  onTogglePlayback: () => void,

  // Whether or not the buttons are disabled. When the buttons are disabled,
  // they can't be pressed and they display a different style.
  disabled?: boolean,

  // Called when the skip ahead button is clicked.
  next: () => void,

  // Called when the skip backwards button is clicked.
  previous: () => void,
};

const PlaybackControls = ({
  playing,
  disabled = false,
  onTogglePlayback,
  next,
  previous,
}: PlaybackControlsProps) => {
  const possiblyDisabledClass = (disabled && disabledClass) || '';

  // Renders the play button when disabled, otherwise renders based on the
  // state of playing.
  const playingWithDisabled = !disabled && playing;

  return (
    <div className={[containerClass, possiblyDisabledClass].join(' ')}>
      <div onClick={() => previous()} className={secondaryClass}>
        <SkipBackwards pathClass={pathClass} />
      </div>
      <PlaybackButton
        containerClass={primaryClass}
        playing={playingWithDisabled}
        onToggle={onTogglePlayback}
        pathClass={pathClass}
      />
      <div onClick={() => next()} className={secondaryClass}>
        <SkipForwards pathClass={pathClass} />
      </div>
    </div>
  );
};

export default PlaybackControls;
