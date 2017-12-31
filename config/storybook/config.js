import { configure } from '@storybook/react';
import './decorators';

configure(() => {
  require('../../src/stories/index');
}, module);
