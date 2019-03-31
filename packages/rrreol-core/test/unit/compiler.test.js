import { existsSync } from 'fs-extra'
import { resolve } from 'path'
import { Compiler } from '@/compiler'
import { isString } from 'lodash'
import { removeFiles } from '@/utils'

describe('Compiler base test', () => {
  const fixturesPath = resolve(__dirname, '..', 'fixtures')

  it('should invoke new throw error', () => {
    expect(() => new Compiler()).toThrowError()
  })

  it('should compile throw error', async () => {
    await expect(Compiler.compile(undefined, undefined)).rejects.toBeInstanceOf(TypeError)

    const input = resolve(__filename, 'error.cpp')
    const output = resolve(__filename, 'error.test.out')
    const path = await Compiler.compile(input, output).catch(err => {
      expect(/g\+\+: error/.test(err)).toBe(true)
    })
    expect(existsSync(path)).toBe(false)
  })

  it('should compile success', async () => {
    const input = resolve(fixturesPath, 'base.cpp')
    const output = resolve(fixturesPath, 'base.test.out')
    const path = await Compiler.compile(input, output)
    expect(isString(path)).toBe(true)
    expect(path).toEqual(resolve(fixturesPath, 'base.test.out'))
    expect(existsSync(output)).toBe(true)
  })

  afterAll(() => {
    removeFiles(fixturesPath, 'base.test.out')
  })
})
