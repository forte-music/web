import React from 'react';
import { storiesOf } from '@storybook/react';

import SongCollage from '.';

const songs = [
  'https://i.scdn.co/image/d345ab2a8278434f1c8cc936ace70da02ac845fb',
  'http://is4.mzstatic.com/image/thumb/Music5/v4/08/da/96/08da9619-3f9b-7c95-60d1-6c18cfdd4dbd/source/600x600bb.jpg',
  'https://upload.wikimedia.org/wikipedia/en/3/3f/AceHood_Bugatti.jpg',
  'https://upload.wikimedia.org/wikipedia/en/f/f6/Here_For_You_single_cover_by_Kygo_and_Ella_Henderson.jpg',
];

storiesOf('SongCollage', module)
  .addDecorator(storyFn => (
    <div style={{ width: 160, height: 160 }}>{storyFn()}</div>
  ))
  .add('no artwork', () => <SongCollage artworkUrls={[]} alt="No Artwork" />)
  .add('one artwork', () => (
    <SongCollage artworkUrls={songs.slice(0, 1)} alt="One Artwork" />
  ))
  .add('two artworks', () => (
    <SongCollage artworkUrls={songs.slice(0, 2)} alt="Two Artworks" />
  ))
  .add('three artworks', () => (
    <SongCollage artworkUrls={songs.slice(0, 3)} alt="Three Artworks" />
  ))
  .add('four artworks', () => (
    <SongCollage artworkUrls={songs.slice(0, 4)} alt="Four Artworks" />
  ));
