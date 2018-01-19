// @flow
import React from 'react';
import { storiesOf } from '@storybook/react';

import Queue from '../containers/Queue';
import Providers from '../providers';
import store from '../store';
import { replaceQueue } from '../actions';
import { songs } from '../graphql/mock';

const ids = Array.from(songs.keys());
ids.sort();

const itemSources = new Array(1000).fill(undefined).map((_, idx) => ({
  songId: ids[idx % ids.length],
}));

store.dispatch(replaceQueue(itemSources));

storiesOf('Queue', module).add('connected', () => (
  <Providers>
    <Queue />
  </Providers>
));
