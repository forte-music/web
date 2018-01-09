// @flow
import React from 'react';
import { Cone, InnerWave } from './Paths';

type Props = {
  svgClass?: string,
  conePathClass?: string,
  innerWavePathClass?: string,
};

const Quiet = ({ svgClass, conePathClass, innerWavePathClass }: Props) => (
  <svg className={svgClass} viewBox="0 0 160 160" version="1.1">
    <Cone pathClass={conePathClass} />
    <InnerWave pathClass={innerWavePathClass} />
  </svg>
);

export default Quiet;
