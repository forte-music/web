import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { collage } from './Collage';
import PlaybackArtwork from '../components/PlaybackArtwork';
import StatefulComponent from './StatefulComponent';
import { PlaybackState } from '../components/PlaybackArtwork';

storiesOf('PlaybackArtwork', module)
  .add('playing with background interaction', () => (
    <Story initialState={'PLAYING'} />
  ))
  .add('paused with background interaction', () => (
    <Story initialState={'PAUSED'} />
  ))
  .add('stopped with background interaction', () => (
    <Story initialState={'STOPPED'} />
  ))
  .add('loading with background interaction', () => (
    <Story initialState={'LOADING'} />
  ))
  .add('paused with link without background interaction', () => (
    <Story initialState={'PAUSED'} backgroundInteraction={false}>
      <a onClick={action('link clicked')}>{collage}</a>
    </Story>
  ));

const Story = ({
  initialState,
  children,
  backgroundInteraction = true,
}: {
  initialState: PlaybackState;
  children?: React.ReactNode;
  backgroundInteraction?: boolean;
}) => (
  <StatefulComponent state={{ playback: initialState }}>
    {({ playback }, setState) => (
      <div style={{ width: 400 }}>
        <PlaybackArtwork
          state={playback}
          onPlaying={() => setState({ playback: 'PLAYING' })}
          onPaused={() => setState({ playback: 'PAUSED' })}
          onStartPlayback={() => setState({ playback: 'PLAYING' })}
          backgroundInteraction={backgroundInteraction}
        >
          {children || collage}
        </PlaybackArtwork>
      </div>
    )}
  </StatefulComponent>
);
