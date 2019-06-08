module.exports = {
  presets: [
    '@babel/env'
  ],
  plugins: [
    '@babel/plugin-transform-runtime',
    '@babel/plugin-proposal-nullish-coalescing-operator',
    '@babel/plugin-proposal-export-default-from',
    '@babel/plugin-proposal-class-properties',
    ['@babel/plugin-proposal-pipeline-operator', { 'proposal': 'minimal' }],
    '@babel/plugin-proposal-optional-chaining',
    '@babel/plugin-proposal-function-bind',
    '@babel/plugin-syntax-dynamic-import'
  ]
}
