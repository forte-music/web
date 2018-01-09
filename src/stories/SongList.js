// @flow
import React from 'react';
import { storiesOf } from '@storybook/react';

import { songs } from '../graphql/data';
import type { Song } from '../graphql/data';
import SongList from '../components/SongList/SongList';
import { Header, Row } from '../components/SongList/Detail';

const ids = Array.from(songs.keys());
ids.sort();

storiesOf('SongList', module).add('interactive', () => (
  <SongList
    count={ids.length}
    totalItems={ids.length}
    loadMore={() => {}}
    header={<Header />}
    renderItem={({ index, style }) => {
      const id = ids[index];
      const song: Song = (songs.get(id): any);

      return (
        <div style={style} key={id}>
          <Row song={song} />
        </div>
      );
    }}
  />
));
