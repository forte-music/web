const paths = require('./config/paths');

module.exports = {
  collectCoverageFrom: ['src/**/*.{ts,tsx}'],
  setupFiles: [
    '<rootDir>/config/polyfills.js',
    '<rootDir>/config/setupTests.js',
  ],
  testMatch: [
    '<rootDir>/src/**/__tests__/**/*.{ts,tsx}',
    '<rootDir>/src/**/?(*.)(spec|test).{ts,tsx}',
  ],
  testURL: 'http://localhost',
  transform: {
    '\\.js$': 'babel-jest',
    '\\.tsx?$': 'ts-jest/preprocessor',
  },
  transformIgnorePatterns: [
    '[/\\\\]node_modules[/\\\\].+\\.(js|jsx|mjs|ts|tsx)$',
  ],
  moduleNameMapper: {
    '^react-native$': 'react-native-web',
    '\\.css$': 'identity-obj-proxy',
  },
  moduleFileExtensions: [
    'web.ts',
    'ts',
    'web.tsx',
    'tsx',
    'web.js',
    'mjs',
    'js',
    'json',
    'web.jsx',
    'jsx',
    'node',
  ],
  globals: {
    'ts-jest': {
      tsConfigFile: paths.appTsConfig,
    },
  },
};
