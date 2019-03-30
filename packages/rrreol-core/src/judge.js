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
      input = [],
      output = [],
      file = isString(props) ? props : null
    } = props
    if (isNil(props)) {
      throw new TypeError(`props file is nil`)
    }

    this.__outputs = output.map((val) => {
      return new FileManager(val)
    })
    this.__inputs = input.map((val) => {
      return new FileManager(val)
    })
    this.__runner = new Runner(file)
    this.__targetFile = this.__outputs[0] // default target
    this.on('start', this.test)
  }

  test = (callback) => {
    const fn = () => {
      callback()
      this.emit('finished')
    }
    // todo
  }

  exec = async () => {
    // todo
  }

  output = (val) => {
    if (!isNumber(val)) {
      throw new TypeError()
    }
    return this
  }

  out = this.output

  input = (val) => {
    if (!isNumber(val)) {
      throw new TypeError()
    }
    return this
  }

  in = this.input

  line = (val) => {
    return JudgeWrapper.of.call(this, val)
  }

  lines = () => {
    const lines = this.__targetFile.lines()
    return JudgeWrapper.of.call(this, curry((val) => {
      return val === lines
    }))
  }

  maxline = () => {
    const lines = this.__targetFile.lines()
    return JudgeWrapper.of.call(this, curry((val) => {
      return val >= lines
    }))
  }

  minline = () => {
    const lines = this.__targetFile.lines()
    return JudgeWrapper.of.call(this, curry((val) => {
      return val <= lines
    }))
  }
}

export default Judge
