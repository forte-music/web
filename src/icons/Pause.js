// @flow
import React from 'react';

type Props = {
  svgClass?: string,
  pathClass?: string,
};

const Pause = ({ svgClass, pathClass }: Props) => (
  <svg className={svgClass} viewBox="0 0 160 160" version="1.1">
    <path
      className={pathClass}
      stroke="#EEEEEE"
      strokeWidth="10"
      d="M102,43 C100.343146,43 99,44.3431458 99,46 L99,114 C99,115.656854 100.343146,117 102,117 C103.656854,117 105,115.656854 105,114 L105,46 C105,44.3431458 103.656854,43 102,43 Z"
    />
    <path
      className={pathClass}
      stroke="#EEEEEE"
      strokeWidth="10"
      d="M58,43 C56.3431458,43 55,44.3431458 55,46 L55,114 C55,115.656854 56.3431458,117 58,117 C59.6568542,117 61,115.656854 61,114 L61,46 C61,44.3431458 59.6568542,43 58,43 Z"
    />
  </svg>
);

export default Pause;
