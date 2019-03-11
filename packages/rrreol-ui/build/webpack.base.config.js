require('dotenv').config()

const os = require('os')
const path = require('path')
const HappyPack = require('happypack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')

const isProd = process.env.NODE_ENV === 'production'
const extractCSS = isProd || process.env.TARGET === 'development'

exports.happyThreadPool = HappyPack.ThreadPool({
  size: Math.min(os.cpus().length, 4)
})

const cssLoaders = [
  extractCSS ? MiniCssExtractPlugin.loader : 'style-loader',
  { loader: 'css-loader', options: { sourceMap: !isProd } },
  { loader: 'postcss-loader', options: { sourceMap: !isProd } },
  { loader: 'stylus-loader', options: { sourceMap: !isProd } }
]

const plugins = [
  new FriendlyErrorsWebpackPlugin({
    clearConsole: true
  })
]

exports.config = {
  resolve: {
    extensions: ['*', '.js', '.json'],
    alias: {
      '@': path.resolve(__dirname, '../', 'src')
    }
  },
  node: {
    fs: 'empty'
  },
  module: {
    rules: [
      {
        test: /\.styl(us)?$/,
        use: cssLoaders
      }
    ]
  },
  plugins,
  performance: {
    hints: false
  },
  stats: { children: false }
}
