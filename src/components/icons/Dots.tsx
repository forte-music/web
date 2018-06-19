import * as React from 'react';

interface Props {
  svgClass?: string;
  pathClass?: string;
}

const Dots = ({ svgClass, pathClass }: Props) => (
  <svg className={svgClass} viewBox="0 0 160 160" version="1.1">
    <circle className={pathClass} fill="#D8D8D8" cx="40" cy="80" r="10" />
    <circle className={pathClass} fill="#D8D8D8" cx="80" cy="80" r="10" />
    <circle className={pathClass} fill="#D8D8D8" cx="120" cy="80" r="10" />
  </svg>
);

export default Dots;
