module.exports = {
  presets: [
    '@babel/preset-env'
  ],
  plugins: [
    '@babel/plugin-proposal-export-default-from',
    '@babel/plugin-proposal-class-properties',
    ['@babel/plugin-proposal-pipeline-operator', { 'proposal': 'minimal' }],
    '@babel/plugin-proposal-optional-chaining',
    '@babel/plugin-proposal-function-bind',
    '@babel/plugin-syntax-dynamic-import'
  ]
}
