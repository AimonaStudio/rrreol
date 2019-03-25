import { getFileName } from '@/utils/helpers'

describe('Util- getFileName unit test', () => {
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

  it('should return value', () => {
    expect(getFileName('1.2')).toEqual('1')
    expect(getFileName('1.2.3')).toEqual('1.2')
    expect(getFileName('1.2.3.4')).toEqual('1.2.3')
    expect(getFileName('1/2.3')).toEqual('2')
    expect(getFileName('  1.2')).toEqual('1')
  })
})
