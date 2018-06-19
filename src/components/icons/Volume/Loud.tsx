import * as React from 'react';
import { Cone, InnerWave, OuterWave } from './Paths';

interface Props {
  svgClass?: string;
  conePathClass?: string;
  innerWavePathClass?: string;
  outerWavePathClass?: string;
}

const Loud = ({
  svgClass,
  conePathClass,
  innerWavePathClass,
  outerWavePathClass,
}: Props) => (
  <svg className={svgClass} viewBox="0 0 160 160" version="1.1">
    <Cone pathClass={conePathClass} />
    <InnerWave pathClass={innerWavePathClass} />
    <OuterWave pathClass={outerWavePathClass} />
  </svg>
);

export default Loud;
