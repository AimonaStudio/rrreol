import JudgeWrapper from '@/judgeWrapper'

describe('JudgeWrapper base test', () => {
  it('should init success', () => {
    const judgeWrapper = new JudgeWrapper(1)
    expect(judgeWrapper).toBeDefined()
  })

  it('should expect success', () => {
    const target = {}
    const judgeWrapper = new JudgeWrapper(1, target)
    expect(judgeWrapper.toBe('1')).toBe(target)
    expect(judgeWrapper.toBe(1)).toBe(target)
  })
})
