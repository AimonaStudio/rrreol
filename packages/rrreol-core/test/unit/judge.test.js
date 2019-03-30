import { Judge } from '@/judge'

describe('Judge base test', () => {
  it('should init success', () => {
    const judge = new Judge('../fixtures/base.cpp')
    const judge2 = judge
      .line(1).toBe('1')
      .line(2).toBe('2')
    expect(judge).toBe(judge2)
  })
})
