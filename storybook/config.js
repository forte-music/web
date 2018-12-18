import React from 'react';
import { configure, addDecorator } from '@storybook/react';
import { RootThemeProvider } from '../src/components/App/RootThemeProvider';
import './styles.css';

const themeDecorator = story => (
  <RootThemeProvider>{story()}</RootThemeProvider>
);
addDecorator(themeDecorator);

const req = require.context('../../src', true, /\.stories\.tsx$/);

configure(() => {
  req.keys().forEach(filename => req(filename));
}, module);
