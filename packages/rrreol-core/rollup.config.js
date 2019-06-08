import packageJson from './package.json'
import commonjs from 'rollup-plugin-commonjs'
import babel from 'rollup-plugin-babel'
import resolve from 'rollup-plugin-node-resolve'
import { terser } from 'rollup-plugin-terser'

const isProd = process.env.NODE_ENV === 'production'

export default {
  input: packageJson.source,
  output: {
    file: packageJson.main,
    format: 'cjs'
  },
  plugins: [
    babel({
      exclude: 'node_modules/**',
      externalHelpers: false,
      runtimeHelpers: true
    }),
    resolve({
      jsnext: true,
      main: true,
      modulesOnly: true
    }),
    commonjs({
      exclude: 'src/**',
      include: 'node_modules/**'
    }),
    isProd && terser()
  ],
  external: id => [
    /ramda/,
    /lodash/
  ].some(regex => regex.test(id))
}
