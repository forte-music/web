import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import StatefulComponent from './StatefulComponent';
import Slider from '../components/Slider';

storiesOf('Slider', module).add('interactive', () => (
  <StatefulComponent state={{ value: 50 }}>
    {({ value }, setState) => (
      <Slider
        onStartSliding={action('startSliding')}
        onDoneSliding={action('endSliding')}
        value={value}
        onValueChange={value => setState({ value })}
      />
    )}
  </StatefulComponent>
));
