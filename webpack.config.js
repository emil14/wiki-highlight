const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    content: './src/content_scripts/index.js',
    popup: './src/popup_scripts/popup.js',
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
  },
  plugins: [new HtmlWebpackPlugin({
    filename: 'popup.html',
    template: './src/popup.html',
    chunks: ['popup'],
  })],
};

