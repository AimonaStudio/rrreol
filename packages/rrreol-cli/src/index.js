const packageJson = require('../package')

const assert = require('assert')
const is = require('is')
const rrreol = require('@rrreol/core')
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

programName = path.resolve(programName)

debug(chalk.blueBright('programName: ') + programName)
Array.of(
  'file',
  'config',
  'input',
  'output'
).forEach(val => {
  if (command[val]) {
    debug(chalk.blueBright(`${val}: `) + command[val])
  }
})

let config = {
  input: '.+\\.in',
  output: '.+\\.out'
}

if (command.input == null) {
  command.input = ''
}
if (command.output == null) {
  command.output = ''
}

let inputs = command.input.split(',')
let outputs = command.output.split(',')

// read native config
if (
  is.boolean(command.config) &&
  command.config === true
) {
  const configPath = path.resolve('rrreol.config.js')
  assert(fs.existsSync(configPath), 'file not exist')
  const rrreolConfig = require(configPath)
  debug(rrreolConfig)
  config = { ...rrreolConfig }
} else if (is.string(command.config)) {
  const configPath = path.resolve(command.config)
  const exist = fs.existsSync(configPath)
  assert(exist, 'file not exist')
  const rrreolConfig = require(command.config)
  config = { ...config, ...rrreolConfig }
}

debug(config)

Array
  .of()
  .concat(inputs)
  .concat(outputs)
  .forEach(file => {
    const pth = path.join(root, file)
    if (!fs.existsSync(pth) && !fs.statSync(file).isFile()) {
      throw new TypeError('cannot find file' + file)
    }
  })

if (inputs.length !== outputs.length) {
  console.warn('inputs and outputs is not same length')
  console.warn('we will ignore more content')
}

(async () => {
  await run(root)
})()

async function run (root) {
  [
    inputs = [...inputs],
    outputs = [...outputs]
  ] = loadFiles(root, config)

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

  debug(chalk.blueBright('inputs: ') + inputs)
  debug(chalk.blueBright('outputs: ') + outputs)

  // todo: need @rrreol/core to finish further
  const { Judge } = rrreol
  const judge = new Judge()
  for (let i = 1; i <= inputs.length; i++) {
    await judge.in(i).readPath(inputs[i])
    await judge.out(i).readPath(outputs[i])
  }
  await judge.exec()
}

// only return file paths
function loadFiles (root, config) {
  if (!fs.existsSync(root)) {
    throw new TypeError(root)
  } else if (!fs.statSync(root).isDirectory()) {
    throw new RangeError(root)
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
  }).filter(file => file)
  const outputFiles = fs.readdirSync(root).map(file => {
    const stat = fs.statSync(file)
    if (stat.isFile()) {
      if (!outputRegex.test(file)) {
        return null
      }
      return path.resolve(root, file)
    }
  }).filter(file => file)
  return [inputFiles, outputFiles]
}
