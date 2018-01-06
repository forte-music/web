// @flow
import React from 'react';
import type { Node } from 'react';

import styles from './Collage.css';

type Props = {
  topLeft: Node,
  topRight: Node,
  bottomLeft: Node,
  bottomRight: Node,
};

// A collage of four square elements.
const Collage = ({ topLeft, topRight, bottomLeft, bottomRight }: Props) => (
  <div className={styles.container}>
    {topLeft}
    {topRight}
    {bottomLeft}
    {bottomRight}
  </div>
);

export default Collage;
