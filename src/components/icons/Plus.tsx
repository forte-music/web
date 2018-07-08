import React from 'react';

interface Props {
  svgClass?: string;
  pathClass?: string;
}

const Plus = ({ svgClass, pathClass }: Props) => (
  <svg className={svgClass} viewBox="0 0 160 160" version="1.1">
    <path
      fill="#EEEEEE"
      className={pathClass}
      d="M70,70 L70,30 C70,24.4771525 74.4771525,20 80,20 C85.5228475,20 90,24.4771525 90,30 L90,70 L130,70 C135.522847,70 140,74.4771525 140,80 C140,85.5228475 135.522847,90 130,90 L90,90 L90,130 C90,135.522847 85.5228475,140 80,140 C74.4771525,140 70,135.522847 70,130 L70,90 L30,90 C24.4771525,90 20,85.5228475 20,80 C20,74.4771525 24.4771525,70 30,70 L70,70 Z"
    />
  </svg>
);

export default Plus;
