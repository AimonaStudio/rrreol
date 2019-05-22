import chalk from 'chalk'

const assert = require('assert')

var openLog
openLog = process.env.NODE_ENV !== 'test'

export const fillColor = (message, level) => {
  assert(typeof message === 'string')
  assert(typeof level === 'string')
  let res = ''
  if (level === 'notice') {
    res = chalk.blueBright(message)
  } else if (level === 'error') {
    res = chalk.red(message)
  } else if (level === 'warn' || level === 'warning') {
    res = chalk.yellowBright(message)
  } else if (level === 'success') {
    res = chalk.green(message)
  } else {
    res = chalk.blueBright(message)
  }
  return res
}

export function prettyLog (message, conf) {
  assert(typeof message === 'string' || (typeof message === 'object' && conf == null))
  assert(conf == null || typeof conf === 'object')
  const { prefix, level } = Object.assign({
    prefix: '',
    level: 'notice'
  }, conf || (typeof message === 'object' && message) || {})
  if (openLog) {
    console.log(`${fillColor(prefix, level)}: ${message}`)
  }
}
