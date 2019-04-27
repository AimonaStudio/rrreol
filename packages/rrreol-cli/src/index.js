const packageJson = require('../package')

const fs = require('fs')
const path = require('path')
const chalk = require('chalk')
const program = require('commander')
const debug = require('debug')('rrreol-debug')

const root = path.resolve()

let programName = null

const command = new program.Command(packageJson.name)
  .arguments('<file>')
  .action(file => {
    programName = file
  })
  .version(packageJson.version)
  .option('-v, --version', `log ${packageJson.name} version`)
  .option('-c, --config [dir]', 'use rrreol config')
  .option('-i, --input [items]')
  .option('-o, --output [items]')
  .allowUnknownOption()
  .on('--version', () => {
    console.log(packageJson.version)
    process.exit(0)
  })
  .parse(process.argv)

debug(programName, command.file, command.config, command.input, command.output)

let config = {
  input: '*.in',
  output: '*.out'
}

let inputs = command.input.split(',') || []
let outputs = command.output.split(',') || []

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

[].concat(inputs)
  .concat(outputs)
  .forEach(file => {
    const pth = path.join(root, file)
    if (!fs.existsSync(pth) && !fs.statSync(file).isFile()) {
      throw new TypeError('cannot find file' + file)
    }
  })

run(root)

function run (root) {
  [
    inputs = [...inputs],
    outputs = [...outputs]
  ] = loadFiles(root)

  if (inputs.length < 1) {
    console.log(chalk.yellowBright('cannot find any file ') +
                                   'by' +
                                   config.input.toString())
  }
  if (outputs.length < 1) {
    console.log(chalk.yellowBright('cannot find any file ') +
                                   'by' +
                                   config.output.toString())
  }

  // todo: need @rrreol/core to finish further
}

// only return file paths
function loadFiles (root, config) {
  if (!fs.existsSync(root)) {
    throw new TypeError()
  } else if (fs.statSync(root).isDirectory()) {
    throw new RangeError()
  }
  const inputRegex = new RegExp(config.input)
  const outputRegex = new RegExp(config.output)
  const inputFiles = fs.readdirSync(root).map(file => {
    const stat = fs.statSync(file)
    if (stat.isFile()) {
      if (!inputRegex.test(file)) {
        return null
      }
      return path.resolve(root, file)
    }
  })
  const outputFiles = fs.readdirSync(root).map(file => {
    const stat = fs.statSync(file)
    if (stat.isFile()) {
      if (!outputRegex.test(file)) {
        return null
      }
      return path.resolve(root, file)
    }
  })
  return [inputFiles, outputFiles]
}
