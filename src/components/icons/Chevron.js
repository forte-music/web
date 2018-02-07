// @flow
import React from 'react';

type Props = {
  svgClass?: string,
  pathClass?: string,
};

const Chevron = ({ svgClass, pathClass }: Props) => (
  <svg className={svgClass} viewBox="0 0 160 160">
    <polygon
      className={pathClass}
      fill="#D8D8D8"
      points="110.112698 79.5685425 55.5672438 136.137085 50.1126984 130.480231 99.2036075 79.5685425 50.1126984 28.6568542 55.5672438 23"
    />
  </svg>
);

export default Chevron;
