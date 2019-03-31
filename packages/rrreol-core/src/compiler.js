import * as cp from 'child_process'
import { isString } from 'lodash'
import { empty, isNil, curry } from 'ramda'

export function Compiler () {
  throw Error('static class shouldn\'t invoke new')
}

Compiler.compile = curry(async (path, output) => {
  if (!isString(path) || !isString(output)) {
    return Promise.reject(new TypeError('path or output is not string'))
  }
  // fixme: add more command options
  const childProcess = cp.spawn('g++', ['-o', output, path])
  return new Promise((resolve, reject) => {
    childProcess.on('exit', (code) => {
      if (code !== 0) {
        let stderr = childProcess.stderr.read()
        if (isNil(stderr)) {
          stderr = empty('')
        }
        reject(Error(stderr.toString()))
      }
      resolve(output)
    })
  })
})

export default Compiler
