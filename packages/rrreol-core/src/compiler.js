import * as cp from 'child_process'
import fs from 'fs-extra'
import { isString } from 'lodash'

export class Compiler {
  constructor (props) {
    if (!props) throw new TypeError('props is nil')
    if (isString(props)) {
      this.__path = props
    } else {
      const { path, output } = props
      if (!isString(path)) throw new TypeError('path is not string')
      this.__path = path
      this.__output = output
    }
  }

  async compile (path) {
    const output = path || this.__output
    const input = this.__path
    if (!output) throw new TypeError()
    // fixme: add more command options
    const process = cp.spawn('g++', ['-o', output, input])
    return new Promise((resolve, reject) => {
      process.on('close', () => resolve(output))
      process.on('error', reject)
    })
  }
}

export default Compiler
