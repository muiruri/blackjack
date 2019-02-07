var path = require('path');
var webpack = require('webpack');
const MinifyPlugin = require("babel-minify-webpack-plugin");

module.exports = {
  devtool: 'source-map',
  entry: [
    './src/js/index.js'
  ],
  output: {
    path: path.join(__dirname, '/dist/js'),
    filename: 'main.js',
    publicPath: '/static/'
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
    new webpack.optimize.UglifyJsPlugin({ sourceMap: true })
  ],
  module: {
    loaders: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader'
    }, {
      test: /\.css$/,
      use: [{
        loader: "style-loader",
        options: {
          insertAt: 'top'
        }
      }, {
        loader: "css-loader"
      }
      ]
    }]
  }
};
