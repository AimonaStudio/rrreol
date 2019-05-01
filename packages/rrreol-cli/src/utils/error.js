const chalk = require('chalk')

const codes = {}
const generators = {}

function E (name, handle) {
  if (typeof handle === 'function') {
    generators[name] = handle
    codes[name] = (...args) => {
      const ErrorInstance = new Error()
      ErrorInstance.message = handle(...args)
      ErrorInstance.name = chalk.red(name)
      ErrorInstance.stack =
        ErrorInstance.stack
          .split('at')
          .filter(v => !/^ E/.test(v))
          .join('at')
      throw ErrorInstance
    }
  }
}

E('INVALID_PARAMETER', function (detail, expect) {
  let res = 'at \'' + detail + '\'\n'
  if (expect != null &&
    typeof expect === 'string'
  ) {
    res = res + expect + '\n'
  }
  return res
})

E('FILE_NOT_EXIST', function (detail, actual) {
  let res = chalk.red('not exit file') + ': ' + actual
  return generators['INVALID_PARAMETER'](detail, res)
})

module.exports = {
  codes: codes
}
