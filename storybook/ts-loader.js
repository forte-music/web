const paths = require('./paths');

module.exports = {
  test: /\.(ts|tsx)$/,
  include: paths.appSrc,
  loader: require.resolve('ts-loader'),
  options: {
    // disable type checker - we will use it in fork plugin
    transpileOnly: true,
  },
};
