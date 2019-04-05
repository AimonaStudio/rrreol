import { resolve } from 'path'
import { getFileName, renameSuffix } from '@/utils/helpers'

describe('Util - getFileName unit test', () => {
  it('should return null', () => {
    expect(getFileName(1)).toBe(null)
    expect(getFileName(null)).toBe(null)
    expect(getFileName(undefined)).toBe(null)
    expect(getFileName({})).toBe(null)
    expect(getFileName('.')).toBe(null)
    expect(getFileName('')).toBe(null)
    expect(getFileName('.1')).toBe(null)
    expect(getFileName('1.')).toBe(null)
    expect(getFileName('   .2')).toBe(null)
  })

  it('should return correct value', () => {
    expect(getFileName('1.2')).toEqual('1')
    expect(getFileName('1.2.3')).toEqual('1.2')
    expect(getFileName('1.2.3.4')).toEqual('1.2.3')
    expect(getFileName('1/2.3')).toEqual('2')
    expect(getFileName('  1.2')).toEqual('1')
  })
})

describe('Util - renameSuffix unit test', () => {
  it('should throw error', () => {
    expect(() => renameSuffix()).toThrowError()
    expect(() => renameSuffix(0, 0)).toThrowError()
    expect(() => renameSuffix(0, '')).toThrowError()
  })

  it('should return correct value', () => {
    expect(renameSuffix('1.', '3')).toEqual('1.3')
    expect(renameSuffix('1.2', '3')).toEqual('1.3')
    expect(renameSuffix('1.2.3', '4')).toEqual('1.2.4')
    expect(renameSuffix(resolve(__dirname, '1.2'), '3')).toEqual(resolve(__dirname, '1.3'))
  })
})
