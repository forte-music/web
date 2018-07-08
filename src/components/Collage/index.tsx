import React, { ReactNode } from 'react';
import styles from './style.css';

interface Props {
  topLeft: ReactNode;
  topRight: ReactNode;
  bottomLeft: ReactNode;
  bottomRight: ReactNode;
}

// A collage of four square elements.
const Collage = ({ topLeft, topRight, bottomLeft, bottomRight }: Props) => (
  <div className={styles.container}>
    <div className={styles.inner}>
      {topLeft}
      {topRight}
      {bottomLeft}
      {bottomRight}
    </div>
  </div>
);

export default Collage;
