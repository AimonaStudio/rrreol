import { FileManager } from '@/fileManager'
import { resolve } from 'path'

describe('FileManager base test', () => {
  it('should init success', () => {
    const fileManager = new FileManager()
    expect(fileManager).toBeDefined()
  })

  it('should have correct type', async () => {
    const filePath = resolve(__dirname, '..', 'fixtures', 'base.out')

    let fileManager = new FileManager()
    await fileManager.read(filePath)
    expect(fileManager.__content).toBeInstanceOf(Array)

    fileManager = new FileManager(filePath)
    expect(fileManager.__content).toBeInstanceOf(Array)
  })

  it('should read file correctly', async () => {
    const filePath = resolve(__dirname, '..', 'fixtures', 'base.out')
    const fileManager = new FileManager()
    await fileManager.read(filePath)
    expect(fileManager.lines()).toEqual(3)
  })
})
