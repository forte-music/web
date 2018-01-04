module.exports = {
  module: {
    rules: [
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
