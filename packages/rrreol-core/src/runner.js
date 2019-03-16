import * as cp from 'child_process'
import stream from 'stream'
import * as path from 'path'
import { EventEmitter } from 'events'
import { isString } from 'lodash'
import { compilerConfig } from './utils'
import FileManager from './fileManager'

// todo
export class Runner extends EventEmitter {
  constructor (path) {
    super()
    if (!isString(path)) {
      throw new TypeError()
    }
    this.__filePath = path
  }

  async exec (stdin = new FileManager()) {
    // todo
    // run code from sandbox
  }

  run = this.exec

  async execUNSAFE (stdin = new FileManager(), timeout = 1000) {
    cp.execFile(this.__filePath, { timeout })
  }

  runUNSAFE = this.execUNSAFE
}

export default Runner
