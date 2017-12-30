import React from 'react';

type PathProps = {
  pathClass?: string,
};

export const Cone = ({ pathClass }: PathProps) => (
  <path
    className={pathClass}
    fill="#D8D8D8"
    d="M61,60 L85,40 L85,120 L61,100 L41,100 L41,60 L61,60 Z"
  />
);

export const InnerWave = ({ pathClass }: PathProps) => (
  <path
    className={pathClass}
    d="M93,60.7495589 C99.0644016,65.2093009 103,72.3950463 103,80.5 C103,88.6049537 99.0644016,95.7906991 93,100.250441 L93,60.7495589 Z"
    fill="#979797"
    fillRule="nonzero"
  />
);

export const OuterWave = ({ pathClass }: PathProps) => (
  <path
    className={pathClass}
    d="M93,42.1599244 C108.709773,47.5558547 120,62.4594404 120,80 C120,97.5405596 108.709773,112.444145 93,117.840076 L93,107.044689 C103.058418,102.200912 110,91.9111027 110,80 C110,68.0888973 103.058418,57.799088 93.0000019,52.9553204 L93,42.1599244 Z"
    fill="#979797"
    fillRule="nonzero"
  />
);
