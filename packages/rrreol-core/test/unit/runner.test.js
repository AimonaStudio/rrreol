import { Runner } from '@/runner'

describe('Runner base test', () => {
  it('should init success', () => {
    const runner = new Runner('1.cpp')
    expect(runner).toBeDefined()
  })
})
