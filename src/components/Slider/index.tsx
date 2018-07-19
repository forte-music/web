import React from 'react';
import styles from './styles.css';
import { noop } from '../../utils';

interface SliderInputProps {
  value?: number;
  min: number;
  max: number;
  inputClass?: string;
  onValueChange: (newValue: number) => void;
  onStartSliding?: () => void;
  onEndSliding?: () => void;
}

export const SliderInput = ({
  inputClass,
  onValueChange,
  min,
  max,
  value,
  onStartSliding = noop,
  onEndSliding = noop,
}: SliderInputProps) => (
  <input
    className={[styles.input, inputClass].join(' ')}
    onChange={e => onValueChange(Number(e.target.value))}
    onMouseDown={onStartSliding}
    onMouseUp={onEndSliding}
    min={min}
    max={max}
    value={value}
    type="range"
  />
);

interface Props {
  // The value of the slider is set to this.
  value: number;

  // Class applied to the container. This can be used to adjust sizing among
  // other things.
  containerClass?: string;

  // Class applied to the slider bar. This can be used to adjust colors among
  // other things.
  barClass?: string;

  // The inclusive lower bound of the output values. The default is 0.
  min?: number;

  // The inclusive upper bound of the output values. The default is 100.
  max?: number;

  // Class applied to the input which reacts to dragging.
  inputClass?: string;

  // Called when the slider is moved.
  onValueChange: (newValue: number) => void;

  // Called when the user starts interacting with the slider.
  onStartSliding?: () => void;

  // Called when the user releases the slider.
  onEndSliding?: () => void;
}

// An simple, flat, interactive slider.
const Slider = ({
  onValueChange,
  onStartSliding,
  onEndSliding,
  value,
  containerClass = '',
  barClass = '',
  inputClass = '',
  min = 0,
  max = 100,
}: Props) => (
  <div className={[styles.container, containerClass].join(' ')}>
    <div
      className={[styles.bar, barClass].join(' ')}
      style={{ width: `${(value - min) / (max - min) * 100}%` }}
    />

    <SliderInput
      inputClass={inputClass}
      onValueChange={onValueChange}
      onStartSliding={onStartSliding}
      onEndSliding={onEndSliding}
      min={min}
      max={max}
      value={value}
    />
  </div>
);

export default Slider;
