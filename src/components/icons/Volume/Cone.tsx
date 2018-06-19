import * as React from 'react';
import { Cone as ConePath } from './Paths';

interface Props {
  svgClass?: string;
  pathClass?: string;
}

const Cone = ({ svgClass, pathClass }: Props) => (
  <svg className={svgClass} viewBox="0 0 160 160" version="1.1">
    <ConePath pathClass={pathClass} />
  </svg>
);

export default Cone;
