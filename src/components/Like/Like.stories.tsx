import React from 'react';
import { storiesOf } from '@storybook/react';
import StatefulComponent from '../../utils/StatefulComponent';
import Like from '.';

storiesOf('Like', module).add('interactive', () => (
  <StatefulComponent state={{ like: true }}>
    {({ like }, setState) => (
      <Like like={like} onToggleLike={() => setState({ like: !like })} />
    )}
  </StatefulComponent>
));
