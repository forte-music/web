import React from 'react';
import { storiesOf } from '@storybook/react';
import StatefulComponent from './StatefulComponent';
import Like from '../components/Like';

storiesOf('Like', module).add('interactive', () => (
  <StatefulComponent state={{ like: true }}>
    {({ like }, setState) => (
      <Like like={like} onToggleLike={() => setState({ like: !like })} />
    )}
  </StatefulComponent>
));
