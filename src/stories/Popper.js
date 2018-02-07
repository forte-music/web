import React from 'react';
import { storiesOf } from '@storybook/react';

import Popper from '../components/Popper';
import StatefulComponent from './StatefulComponent';

storiesOf('Popper', module).add('interactive', () => (
  <StatefulComponent state={{ isOpen: true }}>
    {({ isOpen }, setState) => (
      <Popper isOpen={isOpen} onOpenChanged={isOpen => setState({ isOpen })}>
        hello world!
      </Popper>
    )}
  </StatefulComponent>
));
