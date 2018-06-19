import * as React from 'react';
import { storiesOf } from '@storybook/react';

import Collage from '../components/Collage';
import Artwork from '../components/Artwork';

storiesOf('Collage', module).add('interactive', () => (
  <div style={{ width: 300 }}>{collage}</div>
));

export const collage = (
  <Collage
    topLeft={
      <Artwork
        alt="cover"
        src="https://upload.wikimedia.org/wikipedia/en/7/7a/G-Eazy_These_Things_Happen.jpg"
      />
    }
    topRight={
      <Artwork
        alt="cover"
        src="https://upload.wikimedia.org/wikipedia/en/d/d7/G-Eazy_When_Its_Dark_Out.jpg"
      />
    }
    bottomLeft={
      <Artwork
        alt="cover"
        src="https://upload.wikimedia.org/wikipedia/en/3/31/G-Eazy_-_The_Beautiful_%26_Damned.png"
      />
    }
    bottomRight={
      <Artwork
        alt="cover"
        src="https://images.rapgenius.com/18b0eccbdc3fdee24e8b952be854f4ff.500x500x1.jpg"
      />
    }
  />
);
