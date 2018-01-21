if (!process.env.REACT_APP_API_URL) {
  process.env.REACT_APP_MOCK_RESOLVER = true;
}

module.exports = {
  resolve: {
    alias: require('../aliases'),
  },
  module: {
    rules: [
      {
        test: /\.toml$/,
        loader: require.resolve('toml-loader'),
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
