module.exports = {
  verbose: false,
  roots: [
    '<rootDir>/src',
    '<rootDir>/test'
  ],
  moduleFileExtensions: [
    'ts',
    'js'
  ],
  moduleDirectories: [
    'node_modules'
  ],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1'
  },
  transform: {
    '\\.(styl)$': 'jest-css-modules',
    '.*\\.jsx?$': 'babel-jest'
  },
  collectCoverageFrom: [
    'src/**/*.js'
  ],
  transformIgnorePatterns: [
    'node_modules'
  ],
  snapshotSerializers: [
    'jest-serializer-html'
  ],
  globals: {
    'babel-jest': {
      'babelrcFile': './babel.config.js'
    }
  }
}
