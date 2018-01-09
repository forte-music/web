// @flow
import React from 'react';
import { storiesOf } from '@storybook/react';

import Artwork from '../components/Artwork';

storiesOf('Artwork', module).add('interactive', () => (
  <Artwork
    alt="cover"
    src="https://upload.wikimedia.org/wikipedia/en/7/7a/G-Eazy_These_Things_Happen.jpg"
  />
));
