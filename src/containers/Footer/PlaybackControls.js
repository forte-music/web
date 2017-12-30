// @flow
import React from 'react';

import PlaybackButton from '../../components/PlaybackButton';
import SkipBackwards from '../../icons/SkipBackwards';
import SkipForwards from '../../icons/SkipForwards';

import {
  primary as primaryClass,
  secondary as secondaryClass,
  container as containerClass,
} from './PlaybackControls.css';

type PlaybackControlsProps = {
  playing: boolean,
  onTogglePlayback: () => void,
  next: () => void,
  previous: () => void,
};

const PlaybackControls = ({
  playing,
  onTogglePlayback,
  next,
  previous,
}: PlaybackControlsProps) => (
  <div className={containerClass}>
    <div onClick={() => previous()} className={secondaryClass}>
      <SkipBackwards />
    </div>
    <PlaybackButton
      containerClass={primaryClass}
      playing={playing}
      onToggle={onTogglePlayback}
    />
    <div onClick={() => next()} className={secondaryClass}>
      <SkipForwards />
    </div>
  </div>
);

export default PlaybackControls;
