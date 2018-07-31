import React from 'react';
import styled, { css } from '../../styled-components';

import { rangeThumb, rangeTrack } from '../../styled-mixins/inputRange';

interface Props {
  value: number;
  min: number;
  max: number;
  onValueChange: (newValue: number) => void;
  onStartSliding?: () => void;
  onEndSliding?: () => void;
  className?: string;
}

export const SliderInput = (props: Props) => (
  <SliderInputInner
    className={props.className}
    onChange={e => props.onValueChange(Number(e.target.value))}
    onMouseDown={props.onStartSliding}
    onMouseUp={props.onEndSliding}
    min={props.min}
    max={props.max}
    value={props.value}
    type="range"
  />
);

export const SliderInputInner = styled.input`
  position: absolute;
  width: 100%;
  height: 100%;

  margin: 0;
  padding: 0;
  border: 0;

  /* Hide default chrome in chrome. */
  appearance: none;
  background: transparent;

  &:focus {
    outline: none;
  }

  ${rangeTrack(
    css`
      background: transparent;
    `
  )};

  ${rangeThumb(css`
    /* Hide default chrome in chrome. */
    appearance: none;
    border: none;

    /* The thumb needs to have some size for events to trigger. */
    width: 1px;
    height: 1px;
    background: transparent;
  `)};
`;
