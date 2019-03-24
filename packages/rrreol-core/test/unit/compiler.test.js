import fs from 'fs-extra'
import { resolve } from 'path'
import { Compiler } from '@/compiler'
import { isString } from 'lodash'

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
    const runner = new Compiler({
      path: resolve(__dirname, '../fixtures/base.cpp'),
      output: resolve(__dirname, '../fixtures/base.test.out')
    })
    const path = await runner.compile()
    expect(isString(path)).toBe(true)
    expect(path).toEqual(resolve(__dirname, '../fixtures/base.test.out'))
    // expect(existsSync(path)).toBe(true)
  })

  afterAll(() => {
    const outputs = [
      '../fixtures/base.test.out'
    ]
    outputs.forEach(output => output |> ((_) => resolve(__dirname, _)) |> fs.removeSync
    )
  })
})
