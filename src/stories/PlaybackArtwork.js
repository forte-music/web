import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { collage } from './Collage';
import PlaybackArtwork from '../components/PlaybackArtwork';
import StatefulComponent from './StatefulComponent';

storiesOf('PlaybackArtwork', module)
  .add('playing', () => <Story initialState={'PLAYING'} />)
  .add('paused', () => <Story initialState={'PAUSED'} />)
  .add('with link', () => (
    <Story initialState={'PAUSED'}>
      <a onClick={action('link clicked')}>{collage}</a>
    </Story>
  ));

const Story = ({ initialState, children = collage }) => (
  <StatefulComponent state={{ playback: initialState }}>
    {({ playback }, setState) => (
      <PlaybackArtwork
        state={playback}
        onPlaying={() => setState({ playback: 'PLAYING' })}
        onPaused={() => setState({ playback: 'PAUSED' })}
      >
        {children}
      </PlaybackArtwork>
    )}
  </StatefulComponent>
);
