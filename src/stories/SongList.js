import React from 'react';
import { storiesOf } from '@storybook/react';
import SONGS from '../model';

import SongList, { DetailHeader, DetailRow } from '../components/SongList';

const LoadedDetailRow = ({ id }) => <DetailRow song={SONGS[id]} />;

const ids = ['a', 'b', 'c'];
storiesOf('SongList', module).add('interactive', () => (
  <SongList
    ids={ids}
    totalItems={ids.length}
    loadMore={() => ids}
    header={<DetailHeader />}
    row={LoadedDetailRow}
  />
));
