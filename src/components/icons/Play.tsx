import * as React from 'react';

interface Props {
  pathClass?: string;
  svgClass?: string;
}

const Play = ({ pathClass, svgClass }: Props) => (
  <svg className={svgClass} viewBox="0 0 160 160" version="1.1">
    <path
      className={pathClass}
      strokeWidth="10"
      fill="#EEEEEE"
      stroke="#EEEEEE"
      d="M126.592676,80.876213 L57.48172,118.866829 C56.997739,119.132875 56.3897215,118.956204 56.1236748,118.472223 C56.0425406,118.324627 56,118.15893 56,117.990503 L56,42.0092723 C56,41.4569875 56.4477153,41.0092723 57,41.0092723 C57.1684262,41.0092723 57.3341239,41.0518129 57.48172,41.1329471 L126.592676,79.1235627 C127.076657,79.3896093 127.253328,79.9976269 126.987282,80.4816079 C126.895857,80.6479235 126.758992,80.7847885 126.592676,80.876213 Z"
      id="path-1"
    />
  </svg>
);

export default Play;
