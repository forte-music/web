import React from 'react';
import { storiesOf } from '@storybook/react';
import StatefulComponent from '../../utils/StatefulComponent';
import { VolumeSlider } from '.';
import { RootThemeProvider } from '../App/RootThemeProvider';

storiesOf('VolumeSlider', module).add('interactive', () => (
  <RootThemeProvider>
    <StatefulComponent state={{ volume: 1 }}>
      {(state, setState) => (
        <VolumeSlider
          volume={state.volume}
          onVolume={volume => setState({ volume })}
        />
      )}
    </StatefulComponent>
  </RootThemeProvider>
));
