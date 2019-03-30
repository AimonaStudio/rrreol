import { readdirSync, createFileSync, pathExistsSync, rmdirSync, removeSync } from 'fs-extra'
import { resolve } from 'path'
import { removeFiles } from '@/utils'

describe('Test-Utils removeFiles test', () => {
  const filePath = resolve(__dirname, 'test')
  beforeEach(() => {
    createFileSync(filePath)
  })

  it('should exist file', () => {
    expect(pathExistsSync(filePath)).toBe(true)
  })

  it('should match file', () => {
    readdirSync(__dirname, { withFileTypes: true })
      .forEach(file =>
        file.isFile() &&
        /^test$/.test(file.name) &&
        expect(file.name).toEqual('test')
      )
  })

  it('should throw error', () => {
    expect(() => removeFiles()).toThrowError()
    expect(() => removeFiles(0, 0)).toThrowError()
    expect(() => removeFiles(__dirname)).toThrowError()
  })

  it('should remove file through string', () => {
    expect(pathExistsSync(filePath)).toBe(true)
    removeFiles(__dirname, 'test')
    expect(pathExistsSync(filePath)).toBe(false)
  })

  it('should remove file through array', () => {
    expect(pathExistsSync(filePath)).toBe(true)
    removeFiles(__dirname, ['test'])
    expect(pathExistsSync(filePath)).toBe(false)
  })

  it('should remove file through regex', () => {
    expect(pathExistsSync(filePath)).toBe(true)
    removeFiles(__dirname, /^test$/)
    expect(pathExistsSync(filePath)).toBe(false)
  })

  afterEach(() => {
    removeSync(filePath)
  })
})
