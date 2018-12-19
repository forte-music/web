import React from 'react';
import { configure, addDecorator } from '@storybook/react';
import { RootThemeProvider } from '../src/components/App/RootThemeProvider';
import './styles.css';

const themeDecorator = story => (
  <RootThemeProvider>{story()}</RootThemeProvider>
);
addDecorator(themeDecorator);

// This condition actually should detect if it's an Node environment
// https://stackoverflow.com/questions/38332094/how-can-i-mock-webpacks-require-context-in-jest/42191018#42191018
if (typeof require.context === 'undefined') {
  const fs = require('fs');
  const path = require('path');

  require.context = (
    base = '.',
    scanSubDirectories = false,
    regularExpression = /\.js$/
  ) => {
    const files = {};

    function readDirectory(directory) {
      fs.readdirSync(directory).forEach(file => {
        const fullPath = path.resolve(directory, file);

        if (fs.statSync(fullPath).isDirectory()) {
          if (scanSubDirectories) readDirectory(fullPath);

          return;
        }

        if (!regularExpression.test(fullPath)) return;

        files[fullPath] = true;
      });
    }

    readDirectory(path.resolve(__dirname, base));

    function Module(file) {
      return require(file);
    }

    Module.keys = () => Object.keys(files);

    return Module;
  };
}

const req = require.context('../src', true, /\.stories\.tsx$/);

configure(() => {
  req.keys().forEach(filename => req(filename));
}, module);
