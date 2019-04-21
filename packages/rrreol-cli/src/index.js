const packageJson = require('../package')

const fs = require('fs')
const path = require('path')
const chalk = require('chalk')
const program = require('commander')
const debug = require('debug')('rrreol-debug')

let programName = null

const command = new program.Command(packageJson.name)
  .arguments('<file>')
  .action(file => {
    programName = file
  })
  .version(packageJson.version)
  .option('-v, --version', `log ${packageJson.name} version`)
  .option('-c, --config [dir]', 'use rrreol config')
  .allowUnknownOption()
  .on('--version', () => {
    console.log(packageJson.version)
    process.exit(0)
  })
  .parse(process.argv)

debug(command)
debug(programName, command.config)

let config = {
  input: '*.in',
  output: '*.out'
}

// read native config
if (
  typeof command.config === 'boolean' &&
  command.config === true
) {
  const configPath = path.resolve('rrreol.config.js')
  if (!fs.existsSync(configPath)) {
    debug('not exist file path:' + configPath)
    throw new Error('Invalid parameters on ' + `'${command.options.find(t => /^-c/.test(t.flags)).flags}'`)
  }
  const rrreolConfig = require(configPath)
  debug(rrreolConfig)
} else if (typeof command.config === 'string' &&
  fs.existsSync(path.resolve(command.config))
) {
  const rrreolConfig = require(command.config)
  config = { ...config, ...rrreolConfig }
}
