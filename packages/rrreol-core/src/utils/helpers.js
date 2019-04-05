import { basename, extname } from 'path'

export const compilerConfig = {
  'c': ['gcc', '-pipe'],
  'c++': ['g++', '-pipe']
}

export const getFileName = name => {
  const _ = /[\S]+(?=\..+)/.exec(name)
  return _ && basename(_[0])
}

export const CLRFtoLF = str => str.toString().replace(/\r\n/g, '\n')

export const renameSuffix = (str, suffix) => str.replace(extname(str), '.' + suffix.toString())
