import React from 'react';
import { storiesOf } from '@storybook/react';

import Queue from '.';
import { Providers } from '../App/Providers';
import store from '../../redux/store';
import { populateQueue } from '../../utils/populateQueue';

store.dispatch(populateQueue());

storiesOf('Queue', module).add('connected', () => (
  <Providers>
    <Queue />
  </Providers>
));
