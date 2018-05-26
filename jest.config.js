const aliases = require('./config/aliases');

module.exports = {
    "collectCoverageFrom": [
      "src/**/*.{js,jsx,mjs}"
    ],
    "setupFiles": [
      "<rootDir>/config/polyfills.js",
      "<rootDir>/config/setupTests.js",
    ],
    "testMatch": [
      "<rootDir>/src/**/__tests__/**/*.{js,jsx,mjs}",
      "<rootDir>/src/**/?(*.)(spec|test).{js,jsx,mjs}"
    ],
    "testEnvironment": "node",
    "testURL": "http://localhost",
    "transform": {
      "\\.(gql|graphql)$": "jest-transform-graphql",
      "\\.js$": "babel-jest",
    },
    "transformIgnorePatterns": [
      "node_modules/(?!(@forte-music/(schema|mock))/)"
    ],
    "moduleNameMapper": {
      "^react-native$": "react-native-web",
      "\\.css$": "identity-obj-proxy",
      "^@\\/links$": aliases['@/links$'],
    },
    "moduleFileExtensions": [
      "web.js",
      "mjs",
      "js",
      "json",
      "web.jsx",
      "jsx",
      "node"
    ]
};
