import { resolve } from 'path'
import { Runner } from '@/runner'
import { Compiler } from '@/compiler'
import { isString } from 'lodash'
import { FileManager } from '@/fileManager'
import { removeFiles } from '@/utils'

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

  it('should execUnsafe run success with no input', async () => {
    const basePath = resolve(fixturesPath, 'base.cpp')
    const output = resolve(fixturesPath, 'base.test.out')
    await Compiler.compile(basePath, output)
    runner.filePath = output

    await runner.execUnsafe().then(res => {
      expect(isString(res)).toBe(true)
      expect(res).toEqual('1\n2\n')
    })
  })

  it('should execUnsafe run success with input', async () => {
    const basePath = resolve(fixturesPath, 'print-input.cpp')
    const output = resolve(fixturesPath, 'base.test.out')
    await Compiler.compile(basePath, output)
    runner.filePath = output

    const fm = new FileManager(resolve(fixturesPath, 'print-input.in'))

    await runner.execUnsafe(fm).then(res => {
      expect(isString(res)).toBe(true)
      expect(res).toEqual('1 2')
    })
  })

  afterEach(() => {
    removeFiles(fixturesPath, /\.test\.out$/)
  })
})
