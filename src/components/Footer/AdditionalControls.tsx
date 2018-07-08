import * as React from 'react';

import VolumeSlider from '../VolumeSlider';
import Like from '../Like';

import { formatDuration } from '../../utils/duration';
import * as styles from './AdditionalControls.css';

interface Props {
  duration: number;
  currentTime: number;

  volume: number;
  onVolumeSet: (newVolume: number) => void;

  like: boolean;
  onToggleLike: () => void;
}

const AdditionalControls = ({
  duration,
  currentTime,
  onToggleLike,
  like,
  volume,
  onVolumeSet,
}: Props) => (
  <div className={styles.container}>
    <div className={styles.time}>
      {formatDuration(currentTime)}
      {' / '}
      {formatDuration(duration)}
    </div>

    <Like like={like} onToggleLike={onToggleLike} />
    <VolumeSlider volume={volume} onVolume={onVolumeSet} />
  </div>
);

export default AdditionalControls;
