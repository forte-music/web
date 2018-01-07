module.exports = {
  // Support React Native Web
  // https://www.smashingmagazine.com/2016/08/a-glimpse-into-the-future-with-react-native-for-web/
  'react-native': 'react-native-web',

  // The backend link is resolved based on the value of the
  // REACT_APP_MOCK_RESOLVER environment variable. If it is truthy, a mock
  // resolver is used, otherwise the remote resolver is used. This is needed
  // because otherwise about 500kb of mock resolver code ends up in the
  // production bundle.
  '@/links$': process.env.REACT_APP_MOCK_RESOLVER
    ? './links/mock.js'
    : './links/remote.js',
};
