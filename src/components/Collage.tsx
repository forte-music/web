import * as React from 'react';
import * as styles from './Collage.css';

interface Props {
  topLeft: React.ReactNode;
  topRight: React.ReactNode;
  bottomLeft: React.ReactNode;
  bottomRight: React.ReactNode;
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
