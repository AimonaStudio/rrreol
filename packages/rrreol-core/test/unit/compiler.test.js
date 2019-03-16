import { Compiler } from '@/compiler'

describe('Compiler base test', () => {
  it('should init success', () => {
    const compiler = new Compiler()
    expect(compiler).toBeDefined()
  })
})
