'use strict';

const webpack = require('webpack');
const path = require('path');

const CopyWebPackPlugin = require('copy-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
  entry: './src/index.js',

  output: {
    path: path.resolve(__dirname, 'dist/'),
    publicPath: '/dist/',
    filename: 'bundle.js'
  },

  module: {
    rules: [
      {
        test: [/\.js$/],
        include: path.resolve(__dirname, 'src/'),
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/env']
          }
        }
      },

      // {
      //   test: [/\.vert$/, /\.frag$/ ],
      //   use: 'raw-loader'
      // }
    ]
  },

  resolve: {
    extensions: ['*', '.js']
  },

  plugins: [
    new CleanWebpackPlugin(['build', 'dist'], {
      watch: false,
      beforeEmit: true
    }),

    new webpack.DefinePlugin({
      'CANVAS_RENDERER': JSON.stringify(true),
      'WEBGL_RENDERER': JSON.stringify(true)
    }),

    new CopyWebPackPlugin([
      { from: './src/assets/sprites', to: 'assets/sprites'},
      { from: './src/assets/fonts', to: 'assets/fonts'},
      { from: './src/assets/audio', to: 'assets/audio'},
      { from: './src/index.html', to: 'index.html'},
      { from: './src/index.css', to: 'index.css'},
    ]),
  ],

  devServer: {
    contentBase: '/dist/',
    index: 'index.js',
    port: 3000,
  }
};