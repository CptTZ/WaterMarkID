const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const excludePath = path.resolve(__dirname, "node_modules");
const webappPath = path.resolve(__dirname, "webapp");
const srcPath = path.resolve(webappPath, "src");

module.exports = {
  entry: path.resolve(srcPath, 'app.js'),
  output: {
    path: path.resolve(webappPath, "dist"),
    filename: 'js/[name].bundle.js'
  },
  module: {
    loaders:[
      {
        test:/\.(js|jsx)$/,
        loader: "babel-loader",
        query: {
          presets: ['es2015', 'react'],
          plugins: [["import", { "libraryName": "antd", "libraryDirectory": "lib", "style": "css" }]]
        },
        exclude: excludePath,
        include: srcPath
      },
      {
        test:/\.(css|less)$/,
        loader: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: ["css-loader", "less-loader"]
        })
      }
    ]
  },
  plugins: [
    new htmlWebpackPlugin({
      template: path.resolve(srcPath, 'index.html'),
      filename:'index.html',
      inject: 'body'
    }),
    new ExtractTextPlugin('style.css')
  ]
}