import { fillColor } from '@/utils'

describe('Util - fillColor unit test', () => {
  it('should throw error', () => {
    expect(() => fillColor()).toThrow()
    expect(() => fillColor(null)).toThrow()
    expect(() => fillColor(null, null)).toThrow()
    expect(() => fillColor(undefined)).toThrow()
    expect(() => fillColor(undefined, undefined)).toThrow()
    expect(() => fillColor({}, {})).toThrow()
  })

  it('compare test', () => {
    expect(fillColor('', '')).toBeDefined()
    expect(fillColor('', 'notice')).toBeDefined()
    expect(fillColor('', 'error')).toBeDefined()
    expect(fillColor('', 'warn')).toBeDefined()
    expect(fillColor('', 'warning')).toBeDefined()
  })
})
