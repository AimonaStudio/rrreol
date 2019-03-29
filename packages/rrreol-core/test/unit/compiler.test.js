import fs from 'fs-extra'
import { resolve, join } from 'path'
import { Compiler } from '@/compiler'
import { isString } from 'lodash'
import { removeFiles } from '@/utils'

describe('Compiler base test', () => {
  it('should init success', () => {
    const compiler = new Compiler('../fixtures/base.cpp')
    expect(compiler).toBeDefined()
  })

  it('should throw TypeError', () => {
    expect(() => new Compiler()).toThrow()
    expect(() => new Compiler({})).toThrow()
    expect(() => new Compiler({ output: '' })).toThrow()
  })

  it('should compile success', async () => {
    const input = resolve(__dirname, '../fixtures/base.cpp')
    const output = resolve(__dirname, '../fixtures/base.test.out')
    const runner = new Compiler({
      path: input,
      output
    })
    const path = await runner.compile()
    expect(isString(path)).toBe(true)
    expect(path).toEqual(resolve(__dirname, '../fixtures/base.test.out'))
    expect(fs.existsSync(resolve(__dirname, '../fixtures/base.test.out'))).toBe(true)
  })

  afterAll(() => {
    removeFiles(resolve(__dirname, '../', 'fixtures'), 'base.test.out')
  })
})
