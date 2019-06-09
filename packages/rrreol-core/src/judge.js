import { existsSync } from 'fs'
import { isNil, isString } from 'lodash'
import { curry, equals, findIndex, propEq } from 'ramda'
import { EventEmitter } from 'events'
import { FileManager } from './fileManager'
import { Runner } from './runner'
import { Compiler } from './compiler'
import { prettyLog, renameSuffix } from './utils'

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
      prettyLog({ prefix: 'finished', level: 'success' })
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
      prettyLog('target file is empty', { prefix: 'error', level: 'error' })
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
    prettyLog('file', { prefix: 'Compiling', level: 'notice' })
    const path = await Compiler.compile(this.__path, outputPath)
    prettyLog('file', { prefix: 'Compiled', level: 'notice' })
    this.emit('finish_compile')
    const runner = new Runner(path)

    let index = 0
    for await (const input of this.__inputs) {
      const res = await runner.execUnsafe(input)
      const fileManager = FileManager.of().loadContent(res)
      this.__answer.push(fileManager)
      // check output
      const success = this.compareFileManager(fileManager, this.out(index + 1))
      if (!success) {
        prettyLog(`${index + 1}`, { prefix: 'error on file', level: 'error' })
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
      prettyLog(`judging line ${line + 1}`)
      const realLine = realFM.line(++line)
      const expectedLine = expectedFM.line(line)
      const same = equals(realLine, expectedLine)
      if (!same) {
        success = false
        // todo: support log column
        prettyLog(`On line ${line}, read ${realLine} expected ${expectedLine}`,
          { prefix: 'wrong answer', level: 'error' })
      }
    })
    if (success) {
      prettyLog('compare', { prefix: 'success', level: 'success' })
    } else {
      prettyLog('compare', { prefix: 'finished', level: 'warning' })
    }
    return success
  }
}

export default Judge
