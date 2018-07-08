import * as React from 'react';
import { storiesOf } from '@storybook/react';

import Queue from '../containers/Queue';
import { Providers } from '../components/App/Providers';
import store from '../redux/store';
import { populateQueue } from './populateQueue';

store.dispatch(populateQueue());

storiesOf('Queue', module).add('connected', () => (
  <Providers>
    <Queue />
  </Providers>
));
