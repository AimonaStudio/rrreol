import { existsSync } from 'fs'
import chalk from 'chalk'
import { dirname, resolve, basename } from 'path'
import isNumber from 'is-number'
import { isString, isNil } from 'lodash'
import { curry, equals, propEq, findIndex } from 'ramda'
import { EventEmitter } from 'events'
import { FileManager } from './fileManager'
import { JudgeWrapper } from './judgeWrapper'
import { Runner } from './runner'
import { Compiler } from './compiler'
import { renameSuffix } from './utils'

export class Judge extends EventEmitter {
  constructor (props = {}) {
    super()
    const {
      input = [],
      output = [],
      file = isString(props) ? props : null
    } = props

    this.__outputs = output.map((val) => {
      return new FileManager(val)
    })
    this.__inputs = input.map((val) => {
      return new FileManager(val)
    })
    this.__answer = []

    this.__path = file || null
    this.__target = 0

    this.on('start', this.exec)
    this.on('finished', () => {
      // todo
    })
  }

  get answer () {
    return curry((idx) => this.__answer[idx - 1])
  }

  get input () {
    return curry((idx) => {
      if (isNil(this.__inputs[idx - 1])) {
        this.__inputs[idx - 1] = new FileManager()
      }
      return this.__inputs[idx - 1]
    })
  }

  // alias
  get in () {
    return this.input
  }

  get output () {
    return curry((idx) => {
      if (isNil(this.__outputs[idx - 1])) {
        this.__outputs[idx - 1] = new FileManager()
      }
      return this.__outputs[idx - 1]
    })
  }

  // alias
  get out () {
    return this.output
  }

  get targetFile () {
    if (isNil(this.__outputs[this.__target])) {
      return new FileManager()
    } else {
      return this.__outputs[this.__target]
    }
  }

  run = () => this.emit('start')

  file (val) {
    if (isNil(this.__outputs[this.__target])) {
      console.log(chalk.red('error') + 'target file is empty')
    } else if (isString(val)) {
      findIndex(propEq('name', val))(this.__outputs)
    }
    this.__target = val
    return this
  }

  test = (filePath) => {
    if (isNil(filePath)) {
      throw new TypeError('filePath is nil')
    } else if (!existsSync(filePath)) {
      throw new TypeError(`${filePath} does not exists`)
    }
    this.__path = filePath
    return this
  }

  exec = async () => {
    const outputPath = renameSuffix(this.__path, '.test.out')
    console.log(`${chalk.yellowBright('Compiling')} file`)
    const path = await Compiler.compile(this.__path, outputPath)
    console.log(`${chalk.yellowBright('Compiled')} file`)
    const runner = new Runner(path)
    for await (const input of this.__inputs) {
      const res = await runner.execUnsafe(input)
      const fm = FileManager.of().loadContent(res)
      this.__answer.push(fm)
      this.emit('finished', fm)
    }
    return this
  }

  run = () => this.emit('start')
}

export default Judge
