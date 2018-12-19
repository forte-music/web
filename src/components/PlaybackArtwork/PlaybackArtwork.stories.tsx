import React, { ReactNode } from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { collage } from '../Collage/Collage.stories';
import { PlaybackArtwork, PlaybackState } from '.';
import StatefulComponent from '../../utils/StatefulComponent';

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
    <Story initialState={'PAUSED'} handlesBackgroundInteraction={false}>
      <a onClick={action('link clicked')}>{collage}</a>
    </Story>
  ));

const Story = ({
  initialState,
  children,
  handlesBackgroundInteraction = true,
}: {
  initialState: PlaybackState;
  children?: ReactNode;
  handlesBackgroundInteraction?: boolean;
}) => (
  <StatefulComponent state={{ playback: initialState }}>
    {({ playback }, setState) => (
      <div style={{ width: 400 }}>
        <PlaybackArtwork
          state={playback}
          onPlaying={() => setState({ playback: 'PLAYING' })}
          onPaused={() => setState({ playback: 'PAUSED' })}
          onStartPlayback={() => setState({ playback: 'PLAYING' })}
          handlesBackgroundInteraction={handlesBackgroundInteraction}
        >
          {children || collage}
        </PlaybackArtwork>
      </div>
    )}
  </StatefulComponent>
);
