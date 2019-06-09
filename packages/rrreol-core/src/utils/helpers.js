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
  const res = /[\S]+(?=\..+)/.exec(name)
  return res && basename(res[0])
}

export const CLRFtoLF = str => str.toString().replace(/\r\n/g, '\n')

export const renderStringBack = str => {
  assert(typeof str === 'string', new TypeError('str must be string'))
  let replacer = ''
  switch (platform) {
    case 'win32':
      replacer = '\r\n'
      break
    case 'darwin':
      replacer = '\r'
      break
    case 'linux':
      return str
  }
  return str.replace(/\n/g, replacer)
}

let from = ''
switch (platform) {
  case 'linux':
    // Linux
    from = /\n/g
    break
  case 'win32':
    // Windows
    from = /\r\n/g
    break
  case 'darwin':
    // MacOS
    from = /\r/g
    break
}

export const systemEnterSuffix = from

export const renderString = str => {
  assert(typeof str === 'string', new TypeError('str must be string'))
  return str.replace(from, '\n')
}

export const renameSuffix = (str, suffix) => str.replace(extname(str), '.' + suffix.toString())
