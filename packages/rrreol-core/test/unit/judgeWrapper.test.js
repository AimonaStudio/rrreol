import JudgeWrapper from '@/judgeWrapper'

describe('JudgeWrapper base test', () => {
  it('should init success', () => {
    const judgeWrapper = new JudgeWrapper()
    expect(judgeWrapper).toBeDefined()
  })
})
