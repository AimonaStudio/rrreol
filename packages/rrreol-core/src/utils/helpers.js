import { basename, extname } from 'path'
import assert from 'assert'
import * as os from 'os'

const platform = os.platform()

export const compileCommandRule = {
  '.cpp': 'g++',
  '.c': 'gcc'
}

export const parseFileSuffix = (file) => compileCommandRule[extname(file)] || null

export const getFileName = name => {
  const _ = /[\S]+(?=\..+)/.exec(name)
  return _ && basename(_[0])
}

export const CLRFtoLF = str => str.toString().replace(/\r\n/g, '\n')

export const transformString = (str, from = /\n/, to = undefined) => {
  assert(typeof str === 'string', TypeError('str must be string'))
  if (to == null) {
    switch (platform) {
      case 'linux':
        // Linux
        to = '\n'
        break
      case 'win32':
        // Windows
        to = '\r\n'
        break
      case 'darwin':
        // MacOS
        to = '\r'
        break
    }
  }
  return from[Symbol.replace](str, to)
}

export const renameSuffix = (str, suffix) => str.replace(extname(str), '.' + suffix.toString())
