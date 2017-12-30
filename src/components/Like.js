// @flow
import React from 'react';

import Heart from '../icons/Heart';
import {
  container as containerClass,
  heartContainer as heartClass,
  fill as fillClass,
  liked as likedClass,
} from './Like.css';

type Props = {
  onToggleLike: () => void,
  like: boolean,
};

const Like = ({ onToggleLike, like }: Props) => (
  <div
    className={[containerClass, like && likedClass].join(' ')}
    onClick={() => onToggleLike()}
  >
    <Heart
      svgClass={heartClass}
      fillPathClass={fillClass}
    />
  </div>
);

export default Like;
