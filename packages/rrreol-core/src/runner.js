import * as cp from 'child_process'
import { EventEmitter } from 'events'
import { CLRFtoLF, renderString } from './utils'
import FileManager from './fileManager'

// todo
export class Runner extends EventEmitter {
  constructor (path) {
    super()
    this.filePath = path || ''
  }

  exec = async (stdin = new FileManager()) => {
    // todo
    // run code from sandbox
  }

  run = this.exec

  execUnsafe = async (stdin = new FileManager(), timeout = 1000) => {
    const childProcess = cp.spawn(this.filePath)
    childProcess.stdin.write(stdin.content)
    // need a enter to continue
    childProcess.stdin.write('\n')
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        childProcess.kill('SIGXCPU')
      }, timeout)
      childProcess.on('exit', () => {
        const res = childProcess.stdout.read() || ''
        resolve(renderString(CLRFtoLF(res.toString())))
      })

      childProcess.on('error', reject)
    })
  }

  runUnsafe = this.execUnsafe
}

export default Runner
