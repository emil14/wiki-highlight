const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    content: './src/app_content/index.js',
    popup: './src/app_popup/index.js',
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
  },
  plugins: [new HtmlWebpackPlugin({
    filename: 'popup.html',
    template: './src/app_popup/index.html',
    chunks: ['popup'],
  })],
};

