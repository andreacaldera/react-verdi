const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const APP_NAME = 'app-quote';

module.exports = {
  entry: ['./src/client/index.tsx', `./style/${APP_NAME}.scss`],
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
      // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
      { test: /\.tsx?$/, loader: "awesome-typescript-loader" },
      // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
      { enforce: "pre", test: /\.js$/, loader: "source-map-loader" },
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
  // externals: {
  //   "react": "React",
  //   "react-dom": "ReactDOM"
  // },
  resolve: {
    extensions: ['*', '.js', '.jsx', 'tsx'],
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
