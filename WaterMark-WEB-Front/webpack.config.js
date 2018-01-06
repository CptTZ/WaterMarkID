const path = require('path');
const webpack = require('webpack');
const config = require('./config');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry:{
    'watermark':path.resolve(config.pageDir, 'watermark/index.jsx'),
    'mobile':path.resolve(config.pageDir, 'mobile/index.jsx'),
  },
  output: {
    path: config.distDir,
    filename: 'js/[name].bundle.js'
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
    new ExtractTextPlugin("css/[name].css", {
      allChunks: true
    })
  ]
}