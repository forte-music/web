import { configure } from '@storybook/react';
import './styles.css';

configure(() => {
  require('../../src/stories/index');
}, module);
