import * as React from 'react';

interface Props {
  svgClass?: string;
  pathClass?: string;
  onClick?: () => void;
}

const SkipBackwards = ({ svgClass, pathClass }: Props) => (
  <svg className={svgClass} viewBox="0 0 160 160" version="1.1">
    <g
      id="Symbol/Skip-Forward"
      transform="translate(80.000000, 80.000000) rotate(180.000000) translate(-80.000000, -80.000000)"
    >
      <g id="Symbol/Play" transform="translate(-20.000000, 0.000000)">
        <path
          className={pathClass}
          strokeWidth="10"
          fill="#EEEEEE"
          stroke="#EEEEEE"
          d="M126.592676,80.876213 L57.48172,118.866829 C56.997739,119.132875 56.3897215,118.956204 56.1236748,118.472223 C56.0425406,118.324627 56,118.15893 56,117.990503 L56,42.0092723 C56,41.4569875 56.4477153,41.0092723 57,41.0092723 C57.1684262,41.0092723 57.3341239,41.0518129 57.48172,41.1329471 L126.592676,79.1235627 C127.076657,79.3896093 127.253328,79.9976269 126.987282,80.4816079 C126.895857,80.6479235 126.758992,80.7847885 126.592676,80.876213 Z"
        />
      </g>

      <path
        className={pathClass}
        stroke="#EEEEEE"
        strokeWidth="10"
        d="M131.25,45 C130.559644,45 130,45.5596441 130,46.25 L130,113.75 C130,114.440356 130.559644,115 131.25,115 C131.940356,115 132.5,114.440356 132.5,113.75 L132.5,46.25 C132.5,45.5596441 131.940356,45 131.25,45 Z"
      />
    </g>
  </svg>
);

export default SkipBackwards;
