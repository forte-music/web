// @flow
import React from 'react';

import {
  container as containerClass,
  bar as barClass,
  input as inputClass,
} from './Slider.css';

type Props = {
  // Class applied to the container. This can be used to adjust sizing among
  // other things.
  containerClass?: string,

  // Class applied to the slider bar. This can be used to adjust colors among
  // other things.
  barClass?: string,

  // Class applied to the input which reacts to dragging.
  inputClass?: string,

  // Called when the slider is moved.
  onValueChange: number => void,

  // The value of the slider is set to this.
  value: number,

  // The inclusive lower bound of the output values. The default is 0.
  min: number,

  // The inclusive upper bound of the output values. The default is 100.
  max: number,
};

// An simple, flat, interactive slider.
const Slider = ({
  onValueChange,
  value,
  containerClass: userContainerClass = '',
  barClass: userBarClass = '',
  inputClass: userInputClass = '',
  min = 0,
  max = 100,
}: Props) => (
  <div className={[containerClass, userContainerClass].join(' ')}>
    <div
      className={[barClass, userBarClass].join(' ')}
      style={{ width: `${(value - min) / (max - min) * 100}%` }}
    />

    <input
      className={[inputClass, userInputClass].join(' ')}
      onChange={(e: SyntheticInputEvent<HTMLInputElement>) =>
        onValueChange(Number(e.target.value))
      }
      min={min}
      max={max}
      value={value}
      type="range"
    />
  </div>
);

export default Slider;
