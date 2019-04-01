import { convertToUnit } from '@/utils'

it('should convertToUnit returns the correct value', () => {
  expect(convertToUnit(undefined)).toBeUndefined()
  expect(convertToUnit(null)).toBeUndefined()
  expect(convertToUnit('')).toBeUndefined()
  expect(convertToUnit('-1', 'px')).toBeUndefined()
  expect(convertToUnit('-1')).toBeUndefined()
  expect(convertToUnit(0)).toBe('0px')
  expect(convertToUnit(6)).toBe('6px')
  expect(convertToUnit(3.1415)).toBe('3.1415px')

  expect(convertToUnit(100, 'px')).toBe('100px')

  expect(convertToUnit(0, 'em')).toBe('0em')
  expect(convertToUnit(6, 'em')).toBe('6em')
  expect(convertToUnit(2.71, 'em')).toBe('2.71em')

  expect(convertToUnit('0vw')).toBe('0vw')
  expect(convertToUnit('3vw')).toBe('3vw')
  expect(convertToUnit('3.14vw')).toBe('3.14vw')

  expect(convertToUnit('bread')).toBe('bread')
})
