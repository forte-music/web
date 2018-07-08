import React, { ComponentType } from 'react';

import Slider from '../Slider';
import { Loud, Quiet, Cone } from '../icons/Volume';
import styles from './styles.css';

interface Props {
  // Number between 0 and 1 representing the volume.
  volume: number;

  // Called when the volume changes.
  onVolume: (newVolume: number) => void;
}

function getIconComponent(volume: number): ComponentType<{ svgClass: string }> {
  if (volume < 0.15) {
    return Cone;
  } else if (volume < 0.75) {
    return Quiet;
  } else {
    return Loud;
  }
}

const VolumeIcon = ({
  volume,
  svgClass,
}: {
  svgClass: string;
  volume: number;
}) => {
  const Icon = getIconComponent(volume);
  return <Icon svgClass={svgClass} />;
};

// A slider which a range of [0, 1] and a speaker icons.
const VolumeSlider = ({ volume, onVolume }: Props) => (
  <div className={styles.container}>
    <VolumeIcon svgClass={styles.icon} volume={volume} />

    <Slider
      containerClass={styles.slider}
      barClass={styles.bar}
      inputClass={styles.input}
      min={0}
      max={100}
      value={volume * 100}
      onValueChange={newVolume => onVolume(newVolume / 100)}
    />
  </div>
);

export default VolumeSlider;
