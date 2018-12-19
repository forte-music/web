import React from 'react';
import { Artwork } from '.';

const component = (props: object) => (
  <div style={{ width: 160 }}>
    <Artwork {...props} />
  </div>
);

component.displayName = 'Artwork';

export default {
  props: {
    alt: 'cover',
    src:
      'https://upload.wikimedia.org/wikipedia/en/7/7a/G-Eazy_These_Things_Happen.jpg',
  },
  component,
};
