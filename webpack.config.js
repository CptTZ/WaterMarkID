const path = require('path');
const webpack = require('webpack');
const config = require('./config');
const htmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
  entry: path.resolve(config.jsDir, 'app.js'),
  output: {
    path: config.distDir,
    filename: 'js/[name]-[hash].js'
  },
  module: {
    loaders: [{
        test: /\.(js|jsx)$/,
        loader: "babel-loader",
        query: {
          cacheDirectory: true,
          presets: ['es2015', 'react'],
          plugins: [
            ["import", {
              "libraryName": "antd",
              "libraryDirectory": "lib",
              "style": "css"
            }]
          ]
        },
        exclude: path.resolve(__dirname, "node_modules"),
        include: config.srcDir
      },
      {
        test: /\.(css|less)$/,
        loader: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: ["css-loader", "less-loader"]
        })
      },
      {　　　　　　
        test: /\.(png|jpe?g)$/,
        loader: 'url-loader?limit=10000&name=images/[name]-[hash:8].[ext]'　　　　
      }
    ]
  },
  plugins: [
    new htmlWebpackPlugin({
      template: path.resolve(config.srcDir, 'index.html'),
      filename: 'index.html',
      inject: true
    }),
    new ExtractTextPlugin("css/[name].css", {
      allChunks: true
    }),
    new CleanWebpackPlugin(['dist'], {
      root: '', // An absolute path for the root  of webpack.config.js
      verbose: true, // Write logs to console.
      dry: false // Do not delete anything, good for testing.
    })
  ]
}