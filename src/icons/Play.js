import React from 'react';

const Play = ({ pathClass, svgClass, onClick }) => (
  <svg className={svgClass} onClick={onClick} viewBox="0 0 10 14" version="1.1">
    <path
      className={pathClass}
      d="M1.48,1.36 L8.68,6.76 C8.81254834,6.85941125 8.83941125,7.04745166 8.74,7.18 C8.72294373,7.2027417 8.7027417,7.22294373 8.68,7.24 L1.48,12.64 C1.34745166,12.7394113 1.15941125,12.7125483 1.06,12.58 C1.02105336,12.5280711 1,12.4649111 1,12.4 L1,1.6 C1,1.43431458 1.13431458,1.3 1.3,1.3 C1.36491106,1.3 1.42807115,1.32105336 1.48,1.36 Z"
    />
  </svg>
);

export default Play;
