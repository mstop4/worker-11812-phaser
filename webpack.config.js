'use strict';

const webpack = require('webpack');
const path = require('path');

const CopyWebPackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: './src/index.js',

  output: {
    path: path.resolve(__dirname, 'build'),
    publicPath: './build',
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

      {
        test: [/\.vert$/, /\.frag$/ ],
        use: 'raw-loader'
      }
    ]
  },

  resolve: {
    extensions: ['*', '.js']
  },

  plugins: [
    new webpack.DefinePlugin({
      'CANVAS_RENDERER': JSON.stringify(true),
      'WEBGL_RENDERER': JSON.stringify(true)
    }),

    new CopyWebPackPlugin([{ from: './src/img', to: 'img'}])
  ],

  devServer: {
    contentBase: path.resolve(__dirname, 'build')
  }
};