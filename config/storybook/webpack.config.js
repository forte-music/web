const paths = require('../paths');

module.exports = {
  resolve: {
    alias: require('../aliases'),
  },
  module: {
    rules: [
      // Process JS with Babel.
      {
        test: /\.(js|jsx|mjs)$/,
        include: [paths.appSrc, paths.forteMock],
        loader: require.resolve('babel-loader'),
        options: {
          // This is a feature of `babel-loader` for webpack (not Babel itself).
          // It enables caching results in ./node_modules/.cache/babel-loader/
          // directory for faster rebuilds.
          cacheDirectory: true,
        },
      },
      {
        test: /\.(graphql|gql)$/,
        loader: require.resolve('graphql-tag/loader'),
      },
      {
        test: /\.css$/,
        oneOf: [
          {
            resourceQuery: /^\?raw$/,
            use: [
              require.resolve('style-loader'),
              require.resolve('css-loader'),
            ],
          },
          {
            use: [
              require.resolve('style-loader'),
              {
                loader: require.resolve('css-loader'),
                options: {
                  importLoaders: 1,
                  modules: true,
                  localIdentName: '[name]__[local]___[hash:base64:5]',
                },
              },
              require('../postcss-loader'),
            ],
          },
        ],
      },
    ],
  },
};
