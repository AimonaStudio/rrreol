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

  static compile (path, output) {
    return new Compiler(path).compile(output)
  }

  compile = (path) => {
    const output = path || this.__output
    const input = this.__path
    if (!output) throw new TypeError()
    // fixme: add more command options
    const process = cp.spawnSync('g++', ['-o', output, input])
    if (process.error) {
      throw process.error
    } else if (String(process.stderr).trim() !== '') {
      throw Error(process.stderr)
    }
    return output
  }
}

export default Compiler
