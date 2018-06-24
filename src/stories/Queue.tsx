import * as React from 'react';
import { storiesOf } from '@storybook/react';

import Queue from '../containers/Queue';
import { Providers } from '../providers';
import store from '../store';
import { populateQueue } from './populateQueue';

store.dispatch(populateQueue());

storiesOf('Queue', module).add('connected', () => (
  <Providers>
    <Queue />
  </Providers>
));
