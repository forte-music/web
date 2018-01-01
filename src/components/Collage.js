// @flow
import React from 'react';
import type { Node } from 'react';

import { container as containerClass } from './Collage.css';

type Props = {
  topLeft: Node,
  topRight: Node,
  bottomLeft: Node,
  bottomRight: Node,
};

// A collage of four square elements.
const Collage = ({ topLeft, topRight, bottomLeft, bottomRight }: Props) => (
  <div className={containerClass}>
    {topLeft}
    {topRight}
    {bottomLeft}
    {bottomRight}
  </div>
);

export default Collage;
