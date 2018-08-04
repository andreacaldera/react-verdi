const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const APP_NAME = 'app-shop';

module.exports = {
  entry: ['./src/client/index.js', `./style/${APP_NAME}.scss`],
  plugins: [
    new MiniCssExtractPlugin({
      filename: `${APP_NAME}.css`,
      chunkFilename: `${APP_NAME}.css`,
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              minimize: {
                safe: true,
              },
            },
          },
          {
            loader: 'sass-loader',
            options: {},
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: ['*', '.js', '.jsx'],
  },
  output: {
    path: `${__dirname}/dist`,
    publicPath: '/',
    filename: `${APP_NAME}.js`,
  },
  devServer: {
    contentBase: './dist',
  },
};
