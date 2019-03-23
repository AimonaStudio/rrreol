import { basename } from 'path'

export const compilerConfig = {
  'c': ['gcc', '-pipe'],
  'c++': ['g++', '-pipe']
}

export const getFileName = name => {
  const _ = /[\S]+(?=\..+)/.exec(name)
  return _ && basename(_[0])
}
