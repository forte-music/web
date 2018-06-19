import * as React from 'react';
import { storiesOf } from '@storybook/react';
import StatefulComponent from './StatefulComponent';
import VolumeSlider from '../components/VolumeSlider';

storiesOf('VolumeSlider', module).add('interactive', () => (
  <StatefulComponent state={{ volume: 1 }}>
    {(state, setState) => (
      <VolumeSlider
        volume={state.volume}
        onVolume={volume => setState({ volume })}
      />
    )}
  </StatefulComponent>
));
