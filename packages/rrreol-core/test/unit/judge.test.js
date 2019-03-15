import { Judge } from '@/judge'

describe('base test', () => {
  it('should init success', () => {
    const judge = new Judge('1')
    const judge2 = judge
      .line(1).toBe('1 2 3')
      .line(2).toBe('4 5 6')
    expect(judge).toBe(judge2)
  })
})
