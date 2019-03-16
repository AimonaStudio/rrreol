import { FileManager } from '@/fileManager'

describe('FileManager base test', () => {
  it('should init success', () => {
    const fileManager = new FileManager()
    expect(fileManager).toBeDefined()
  })
})
