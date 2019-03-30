import { resolve } from 'path'
import { existsSync, readFileSync } from 'fs'
import { FileManager } from '@/fileManager'
import { removeFiles } from '@/utils'

describe('FileManager base test', () => {
  it('should init success', () => {
    const fileManager = new FileManager()
    expect(fileManager).toBeDefined()
    expect(fileManager.__content).toBeNull()
    expect(fileManager.filePath).toBeNull()
    expect(fileManager.content()).toEqual('')
  })
})

describe('FileManager File System test', () => {
  const fixturesPath = resolve(__dirname, '..', 'fixtures')
  const inputFilePath = resolve(fixturesPath, 'base.out')
  const outFilePath = resolve(fixturesPath, '1.out.test.out')

  let fileManager = null

  beforeEach(() => {
    fileManager = new FileManager()
  })

  it('should exist files', () => {
    expect(existsSync(fixturesPath)).toBe(true)
    expect(existsSync(inputFilePath)).toBe(true)
  })

  it('should have correct type', async () => {
    await fileManager.read(inputFilePath)
    expect(fileManager.__content).toBeInstanceOf(Array)

    fileManager = new FileManager(inputFilePath)
    expect(fileManager.__content).toBeInstanceOf(Array)
  })

  it('should read file correctly', async () => {
    await fileManager.read(inputFilePath)
    expect(fileManager.lines()).toEqual(3)
  })

  it('should save file correctly', async () => {
    await fileManager.read(inputFilePath)
    expect(fileManager.content()).toEqual('1\n2\n')
    await fileManager.save(outFilePath)
    expect(existsSync(outFilePath)).toBe(true)
    const content = readFileSync(outFilePath).toString()
    expect(content).toEqual('1\n2\n')
  })

  afterAll(() => {
    removeFiles(fixturesPath, /\.test\.out$/)
  })
})
