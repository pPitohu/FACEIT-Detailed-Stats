const path = require('path');
const Dotenv = require('dotenv-webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  mode: 'production',
  entry: {
    index: './src/index.js',
    background: './src/background.js',
    main: './src/main.js',
    style: './src/style.js',
  },
  output: {
    filename: '[name].js',
    path: __dirname + '/dist',
  },
  plugins: [
    new Dotenv()
  ],
};