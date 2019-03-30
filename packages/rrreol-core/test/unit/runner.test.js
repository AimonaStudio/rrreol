import { resolve } from 'path'
import { Runner } from '@/runner'
import { Compiler } from '@/compiler'
import { isString } from 'lodash'
import { removeFiles } from '../../src/utils'

describe('Runner base test', () => {
  it('should init success', () => {
    const runner = new Runner('1.cpp')
    expect(runner).toBeDefined()
  })
})

describe('Runner execUnsafe test', () => {
  const fixturesPath = resolve(__dirname, '..', 'fixtures')
  let runner = null
  beforeEach(() => {
    runner = new Runner()
  })

  it('should execUnsafe base test', async () => {
    const basePath = resolve(fixturesPath, 'base.cpp')
    const output = resolve(fixturesPath, 'base.test.out')
    Compiler.compile(basePath, output)
    runner.filePath = output

    await runner.execUnsafe().then(res => {
      expect(isString(res)).toBe(true)
      expect(res).toEqual('1\n2\n')
    })
  })

  afterAll(() => {
    removeFiles(fixturesPath, /\.test\.out$/)
  })
})
