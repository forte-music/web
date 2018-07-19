import React from 'react';
import { storiesOf } from '@storybook/react';
import StatefulComponent from '../../utils/StatefulComponent';
import VolumeSlider from '.';

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
