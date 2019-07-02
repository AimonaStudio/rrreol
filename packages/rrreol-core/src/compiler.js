import { spawn } from 'child_process'
import { isString } from 'lodash'

export function Compiler () {
  throw Error('static class shouldn\'t invoke new')
}

Compiler.compile = async (path, output, ...args) => {
  if (!isString(path) || !isString(output)) {
    return Promise.reject(new TypeError('path or output is not string'))
  }
  // todo: add more command options
  const childProcess = spawn('g++', ['-o', output, path])
  return new Promise((resolve, reject) => {
    childProcess.on('exit', (code) => {
      if (code !== 0) {
        let stderr = childProcess.stderr.read()
        if (stderr == null) {
          stderr = ''
        }
        reject(Error(stderr.toString()))
      }
      resolve(output)
    })
  })
}

export default Compiler
