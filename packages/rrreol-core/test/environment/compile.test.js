import { removeFiles } from '@/utils'
import { getFileName } from '@/utils/helpers'
import * as cp from 'child_process'
import { existsSync } from 'fs'
import { join, resolve } from 'path'

describe('Environment test', () => {
  const root = resolve(__dirname, '../', 'fixtures')

  const input = ['base.cpp', 'cin.cpp']

  beforeAll(() => {
    input.forEach(fileRealName => {
      const name = getFileName(fileRealName)
      cp.spawnSync('g++', [
        join(root, fileRealName),
        '-o',
        join(root, `${name}.test.out`)
      ])
    })
  })

  it('should compile success', () => {
    input.forEach(fileRealName => {
      const name = getFileName(fileRealName)
      expect(existsSync(join(root, `${name}.test.out`))).toBe(true)
    })
  })

  // remove output files after finished
  afterAll(() => {
    removeFiles(root, /test\.out$/)
  })
})
