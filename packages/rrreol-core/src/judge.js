import * as path from 'path'
import isNumber from 'is-number'
import { isString, isNil } from 'lodash'
import { curry } from 'ramda'
import { EventEmitter } from 'events'
import { FileManager } from './fileManager'
import { JudgeWrapper } from './judgeWrapper'
import { Runner } from './runner'

export class Judge extends EventEmitter {
  constructor (props) {
    super()
    const {
      input = ['./'],
      output = ['./'],
      file = isString(props) ? props : null
    } = props
    if (!isNil) {
      throw new TypeError(`props file is nil`)
    }

    this.__outputs = output.map((val) => {
      return new FileManager(path.resolve(val))
    })
    this.__inputs = input.map((val) => {
      return new FileManager(path.resolve(val))
    })
    this.__runner = new Runner(file)
    this.__targetFile = this.__outputs[0] // default target
    this.on('start', this.test)
  }

  test (callback) {
    const fn = () => {
      callback()
      this.emit('finished')
    }
    // todo
  }

  async exec () {
    // todo
  }

  output (val) {
    if (!isNumber(val)) {
      throw new TypeError()
    }
    return this
  }

  out = this.output

  input (val) {
    if (!isNumber(val)) {
      throw new TypeError()
    }
    return this
  }

  in = this.input

  line (val) {
    return JudgeWrapper.of.call(this, val)
  }

  lines () {
    const count = 1 // fixme: bind the real val
    return JudgeWrapper.of.call(this, curry((val) => {
      return val === count
    }))
  }

  maxline () {
    const count = 1 // fixme: bind the real val
    return JudgeWrapper.of.call(this, curry((val) => {
      return val >= count
    }))
  }

  minline () {
    const count = 2 // fixme: bind the real val
    return JudgeWrapper.of.call(this, curry((val) => {
      return val <= count
    }))
  }
}

export default Judge
