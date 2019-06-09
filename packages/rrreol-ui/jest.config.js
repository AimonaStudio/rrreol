const base = require('../../jest.config')

module.exports = {
  ...base,
  collectCoverageFrom: [
    'src/**/*(!index|bootstrap).js'
  ]
}
