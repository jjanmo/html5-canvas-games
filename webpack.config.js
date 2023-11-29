const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');

const BASE_ENTRY_URL = './src/public';
const BASE_VIEWS_URL = './src/views';

module.exports = {
  entry: {
    home: `${BASE_ENTRY_URL}/home/app.js`,
    vampire: `${BASE_ENTRY_URL}/vampire/app.js`,
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'home.html',
      template: `${BASE_VIEWS_URL}/home.html`,
      chunks: ['home'],
    }),
    new HtmlWebpackPlugin({
      filename: 'vampire.html',
      template: `${BASE_VIEWS_URL}/vampire.html`,
      chunks: ['vampire'],
    }),
    new MiniCssExtractPlugin({
      filename: '[name].bundle.css',
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: './src/public/assets',
          to: 'assets',
        },
      ],
    }),
  ],
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.(jpg|jpeg|png|svg|gif)$/i,
        type: 'assets',
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'assets',
      },
    ],
  },
};
