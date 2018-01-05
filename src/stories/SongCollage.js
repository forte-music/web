// @flow
import React from 'react';
import { storiesOf } from '@storybook/react';

import SongCollage from '../components/SongCollage';
import SONGS from '../model';
import type { Song } from '../model';

const firstSong = SONGS['a'];
const noArtwork: Song = {
  ...firstSong,
  album: {
    ...firstSong.album,
    artworkUrl: undefined,
  },
};

const thirdSong = SONGS['b'];
const fourthSong: Song = {
  ...thirdSong,
  album: {
    ...thirdSong.album,
    artworkUrl:
      'https://upload.wikimedia.org/wikipedia/en/f/f6/Here_For_You_single_cover_by_Kygo_and_Ella_Henderson.jpg',
  },
};

storiesOf('SongCollage', module)
  .addDecorator(storyFn => (
    <div style={{ width: 160, height: 160 }}>{storyFn()}</div>
  ))
  .add('no artwork', () => <SongCollage songs={[noArtwork]} alt="No Artwork" />)
  .add('one artwork', () => (
    <SongCollage songs={[SONGS['a']]} alt="One Artwork" />
  ))
  .add('two artworks', () => (
    <SongCollage songs={[SONGS['a'], SONGS['b']]} alt="Two Artworks" />
  ))
  .add('three artworks', () => (
    <SongCollage
      songs={[SONGS['a'], SONGS['b'], SONGS['c']]}
      alt="Three Artworks"
    />
  ))
  .add('four artworks', () => (
    <SongCollage
      songs={[SONGS['a'], SONGS['b'], SONGS['c'], fourthSong]}
      alt="Four Artworks"
    />
  ));
