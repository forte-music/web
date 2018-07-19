import React from 'react';

import Heart from '../icons/Heart';
import styles from './style.css';

interface Props {
  onToggleLike: () => void;
  like: boolean;
}

const Like = ({ onToggleLike, like }: Props) => (
  <div
    className={[styles.container, like ? styles.liked : ''].join(' ')}
    onClick={onToggleLike}
  >
    <Heart svgClass={styles.heartContainer} fillPathClass={styles.fill} />
  </div>
);

export default Like;
