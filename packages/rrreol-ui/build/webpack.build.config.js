const path = require('path')
const merge = require('webpack-merge')

const { config: baseWebpackConfig } = require('./webpack.base.js')

// todo
// 开发中
// 暂且不需要部署到生产环境

module.exports = merge(baseWebpackConfig, {})
