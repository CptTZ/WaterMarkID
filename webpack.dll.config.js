const webpack = require('webpack');
const path = require('path');

const vendors = [
  'antd',
  'react',
  'react-dom',
  'react-router-dom'
];

module.exports = {
  output: {
    path: path.resolve(__dirname, "webapp/dist"),
    filename: '[name].js',
    library: '[name]',
  },
  entry: {
    dll: vendors,
  },
  plugins: [
    new webpack.DllPlugin({
      path: 'manifest.json',
      name: '[name]',
      context: __dirname,
    }),
  ],
};