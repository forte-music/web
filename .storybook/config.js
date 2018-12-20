import React from 'react';
import requireContext from 'require-context.macro';
import { configure, addDecorator } from '@storybook/react';
import { RootThemeProvider } from '../src/components/App/RootThemeProvider';
import './styles.css';

const themeDecorator = story => (
  <RootThemeProvider>{story()}</RootThemeProvider>
);
addDecorator(themeDecorator);

const req = requireContext('../src', true, /\.stories\.tsx$/);

configure(() => {
  req.keys().forEach(filename => req(filename));
}, module);
