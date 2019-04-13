import * as rrreol from '@/'

describe('index test', () => {
  it('should have content', () => {
    expect(rrreol.Compiler).toBeDefined()
    expect(rrreol.FileManager).toBeDefined()
    expect(rrreol.Judge).toBeDefined()
    expect(rrreol.Runner).toBeDefined()
  })
})
