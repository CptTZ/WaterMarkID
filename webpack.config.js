const path = require('path');
const webpack = require('webpack');
const htmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const excludePath = path.resolve(__dirname, "node_modules");
const webappPath = path.resolve(__dirname, "webapp");
const srcPath = path.resolve(webappPath, "src");

module.exports = {
  cache: true,
  entry: path.resolve(srcPath, 'app.js'),
  output: {
    path: path.resolve(webappPath, "dist"),
    filename: 'js/[name].bundle.js'
  },
  module: {
    loaders: [{
        test: /\.(js|jsx)$/,
        loader: "babel-loader",
        include: [
          path.join(__dirname, "client") //important for performance!
        ],
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
        exclude: excludePath,
        include: srcPath
      },
      {
        test: /\.(css|less)$/,
        loader: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: ["css-loader", "less-loader"]
        })
      },
      {　　　　　　
        test: /\.(png|jpg)$/,
        loader: 'url-loader?limit=8192&name=images/[hash:8].[name].[ext]'　　　　
      }
    ]
  },
  plugins: [
    new htmlWebpackPlugin({
      template: path.resolve(srcPath, 'index.html'),
      filename: 'index.html',
      inject: true
    }),
    new ExtractTextPlugin('style.css')
    // new webpack.DllReferencePlugin({
    //   context: __dirname,
    //   manifest: require('./manifest.json'),
    // })
  ]
}