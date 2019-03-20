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

  it('should compile success', () => {
    const runner = new Compiler({
      path: '../fixtures/base.cpp'
    })
    const path = runner.compile()
  })
})
