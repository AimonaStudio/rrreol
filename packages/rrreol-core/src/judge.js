import { existsSync } from 'fs'
import chalk from 'chalk'
import { isString, isNil } from 'lodash'
import { curry, equals, propEq, findIndex } from 'ramda'
import { EventEmitter } from 'events'
import { FileManager } from './fileManager'
import { Runner } from './runner'
import { Compiler } from './compiler'
import { renameSuffix } from './utils'

export class Judge extends EventEmitter {
  constructor (props = {}) {
    super()
    const {
      input = [],
      output = [],
      file = isString(props) ? props : null,
      ignoreEndEnter = true
    } = props

    this.__outputs = output.map((val) => {
      return new FileManager(val)
    })
    this.__inputs = input.map((val) => {
      return new FileManager(val)
    })
    this.__answer = []
    this.__config = Object.assign({
      ignoreEndEnter: true // if ignore the `\n` at the line end
    }, {
      ignoreEndEnter
    })

    this.__task = []

    this.__path = file || null
    this.__target = 0

    this.on('start', this.exec)
    this.on('finish_compile', () => {
      // todo
      console.log(chalk.greenBright('finished'))
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
      // todo
      findIndex(propEq('name', val))(this.__outputs)
    }
    this.__target = val - 1
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

    let index = 0
    for await (const input of this.__inputs) {
      const res = await runner.execUnsafe(input)
      const fileManager = FileManager.of().loadContent(res)
      this.__answer.push(fileManager)
      // check output
      const success = this.compareFileManager(fileManager, this.out(index + 1))
      if (!success) {
        console.log(`${chalk.red('error on file')} ${index + 1}`)
      }

      ++index
    }
    return this
  }

  compareFileManager = (realFM, expectedFM) => {
    if (!(realFM instanceof FileManager) ||
      !(expectedFM instanceof FileManager)) {
      throw new TypeError()
    }
    let success = true
    Object.keys(Array(realFM.lines()).fill(null)).forEach((_, line) => {
      console.log(`judging line ${line + 1}`)
      const realLine = realFM.line(++line)
      const expectedLine = expectedFM.line(line)
      const same = equals(realLine, expectedLine)
      if (!same) {
        success = false
        // todo: support log column
        console.log(`${chalk.red('wrong answer:')} On line ${line}, read ${realLine} expected ${expectedLine}`)
      }
    })
    if (success) {
      console.log(`${chalk.greenBright('success')} compare`)
    } else {
      console.log(`${chalk.yellowBright('finished')} compare`)
    }
    return success
  }

  run = () => this.emit('start')
}

export default Judge
