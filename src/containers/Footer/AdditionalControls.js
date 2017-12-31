// @flow
import React from 'react';

import VolumeSlider from '../../components/VolumeSlider';
import Like from '../../components/Like';

import { formatDuration } from '../../utils';
import {
  container as containerClass,
  time as timeClass,
} from './AdditionalControls.css';

type Props = {
  duration?: number,
  currentTime?: number,
  volume: number,
  onVolumeSet: number => void,
  like: boolean,
  onToggleLike: () => void,
};

const AdditionalControls = ({
  duration,
  currentTime,
  volume,
  onVolumeSet,
  like,
  onToggleLike,
}: Props) => (
  <div className={containerClass}>
    {!!currentTime &&
      !!duration && (
        <div className={timeClass}>
          {formatDuration(currentTime)}
          {' / '}
          {formatDuration(duration)}
        </div>
      )}

    <Like like={like} onToggleLike={onToggleLike} />
    <VolumeSlider volume={volume} onVolume={onVolumeSet} />
  </div>
);

export default AdditionalControls;
