// @flow
import React from 'react';

import { container as containerClass } from './Artwork.css';

type Props = {
  src: string,
  alt: string,
};

// A styled image for consistent album artwork.
const Artwork = ({ src, alt }: Props) => (
  <img draggable={false} className={containerClass} src={src} alt={alt} />
);

export default Artwork;
