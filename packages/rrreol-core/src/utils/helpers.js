import { basename, extname } from 'path'
import assert from 'assert'
import * as os from 'os'

const platform = os.platform()
let from = ''

switch (platform) {
  case 'linux':
    // Linux
    from = /\n/
    break
  case 'win32':
    // Windows
    from = /\r\n/
    break
  case 'darwin':
    // MacOS
    from = /\r/
    break
}

export const compileCommandRule = {
  '.cpp': 'g++',
  '.c': 'gcc'
}

export const parseFileSuffix = (file) => compileCommandRule[extname(file)] || null

export const getFileName = name => {
  const res = /[\S]+(?=\..+)/.exec(name)
  return res && basename(res[0])
}

export const CLRFtoLF = str => str.toString().replace(/\r\n/g, '\n')

export const systemEnterSuffix = from

export const renderString = str => {
  assert(typeof str === 'string', TypeError('str must be string'))
  return from[Symbol.replace](str, '\n')
}

export const renameSuffix = (str, suffix) => str.replace(extname(str), '.' + suffix.toString())
