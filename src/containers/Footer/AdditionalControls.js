// @flow
import React from 'react';

import VolumeSlider from '../../components/VolumeSlider';
import Like from '../../components/Like';

import { formatDuration } from '../../utils';
import styles from './AdditionalControls.css';

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
  <div className={styles.container}>
    {!!currentTime &&
      !!duration && (
        <div className={styles.time}>
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
