import React from 'react';
import { storiesOf } from '@storybook/react';

import { collage } from './Collage';
import PlaybackArtwork from '../components/PlaybackArtwork';
import StatefulComponent from './StatefulComponent';

storiesOf('PlaybackArtwork', module)
  .add('playing', () => <Story initialState={'PLAYING'} />)
  .add('paused', () => <Story initialState={'PAUSED'} />);

const Story = ({ initialState }) => (
  <StatefulComponent state={{ playback: initialState }}>
    {({ playback }, setState) => (
      <PlaybackArtwork
        state={playback}
        onPlaying={() => setState({ playback: 'PLAYING' })}
        onPaused={() => setState({ playback: 'PAUSED' })}
      >
        {collage}
      </PlaybackArtwork>
    )}
  </StatefulComponent>
);
