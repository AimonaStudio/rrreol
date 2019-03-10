const path = require('path')
const merge = require('webpack-merge')
const webpack = require('webpack')
const HappyPack = require('happypack')

const { config: baseWebpackConfig, happyThreadPool } = require('./webpack.base.config')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = merge(baseWebpackConfig, {
  entry: path.resolve(__dirname, '../', 'src', 'index.js'),
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, '../', 'dist')
  },
  resolve: {
    alias: {
      'react-dom': '@hot-loader/react-dom'
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'happypack/loader?id=js',
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.(png|jpe?g|gif|svg|eot|ttf|woff|woff2)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000,
              name: 'img/[name].[hash:7].[ext]'
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'RRReol',
      template: path.resolve(__dirname, '../', 'static', 'index.html')
    }),
    new webpack.HotModuleReplacementPlugin(),
    new HappyPack({
      id: 'js',
      threadPool: happyThreadPool,
      loaders: ['babel-loader', 'eslint-loader?cache=true?emitWarning=true']
    })
  ],
  optimization: {
    namedModules: true
  },
  devServer: {
    contentBase: path.resolve(__dirname, '../', 'dist'),
    host: process.env.HOST || 'localhost',
    port: process.env.PORT || '8080',
    disableHostCheck: true
  }
})
