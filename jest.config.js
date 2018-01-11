if (!process.env.REACT_APP_API_URL) {
  process.env.REACT_APP_MOCK_RESOLVER = true;
}

const aliases = require('./config/aliases');

module.exports = {
    "globals": {
      "REACT_APP_API_URL": process.env.REACT_APP_API_URL,
    },
    "collectCoverageFrom": [
      "src/**/*.{js,jsx,mjs}"
    ],
    "setupFiles": [
      "<rootDir>/config/polyfills.js"
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
      "\\.toml$": "<rootDir>/config/jest/tomlTransform.js",
    },
    "transformIgnorePatterns": [
      "[/\\\\]node_modules[/\\\\].+\\.(js|jsx|mjs)$"
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
