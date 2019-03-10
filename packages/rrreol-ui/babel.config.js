const merge = require('babel-merge')

const baseBabelConfig = require('../../babel.config')

module.exports = merge(baseBabelConfig, {
  presets: ['@babel/preset-react'],
  plugins: [
    '@babel/plugin-transform-react-jsx'
  ]
})
