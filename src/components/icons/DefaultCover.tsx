import React from 'react';

interface Props {
  svgClass?: string;
  pathClass?: string;
}

const DefaultCover = ({ svgClass, pathClass }: Props) => (
  <svg
    className={svgClass}
    viewBox="0 0 160 160"
    version="1.1"
    style={{ background: '#1B1B1B' }}
  >
    <circle
      className={pathClass}
      id="Full-Disk"
      fill="#333334"
      cx="80"
      cy="80"
      r="75"
    />
    <circle
      className={pathClass}
      id="Ring-Outer"
      fill="#1B1B1B"
      cx="80"
      cy="80"
      r="25"
    />
    <circle
      className={pathClass}
      id="Ring-Inner"
      fill="#333333"
      cx="80"
      cy="80"
      r="21"
    />
    <circle
      className={pathClass}
      id="Inner-Circle"
      fill="#1B1B1B"
      cx="80"
      cy="80"
      r="12"
    />
  </svg>
);

export default DefaultCover;
