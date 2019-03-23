import * as fs from 'fs-extra'
import { Compiler } from '@/compiler'

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
      path: '../fixtures/base.cpp'
    })
    // const path = await runner.compile()
    // expect(fs.pathExistsSync(path)).toBe(true)
  })
})
