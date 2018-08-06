import React from 'react';
import { storiesOf } from '@storybook/react';
import { SearchPage } from './SearchPage';
import { noop } from '../utils';

storiesOf('SearchPage', module).add('loading without results', () => (
  <SearchPage
    query={''}
    setQuery={noop}
    updateResultsNow={noop}
    isLoading
    results={undefined}
    startPlayingFromSong={noop}
  />
));
