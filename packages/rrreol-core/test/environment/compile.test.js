import * as cp from 'child_process'
import * as path from 'path'
import fs from 'fs-extra'
import { getFileName } from '@/utils/helpers'
import { removeFiles } from '../utils'

describe('Environment test', () => {
  const root = path.resolve(__dirname, '../', 'fixtures')

  const input = ['base.cpp', 'cin.cpp']

  beforeAll(() => {
    input.forEach(v => {
      const name = getFileName(v)
      cp.spawnSync('g++', [
        '-o',
        path.join(root, `${name}.test.out`),
        path.join(root, v)
      ])
    })
  })

  it('should compile success', () => {
    input.forEach(v => {
      const name = getFileName(v)
      expect(fs.existsSync(path.join(root, `${name}.test.out`))).toBe(true)
    })
  })

  // remove output files after finished
  afterAll(() => {
    removeFiles(root, /test\.out$/)
  })
})
