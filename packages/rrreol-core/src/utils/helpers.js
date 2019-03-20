export const compilerConfig = {
  'c': ['gcc', '-pipe'],
  'c++': ['g++', '-pipe']
}

export const getFileName = name => /.+(?=\..+)/.exec(name)[0] || null
