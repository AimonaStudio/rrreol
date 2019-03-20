import * as cp from 'child_process'
import fs from 'fs-extra'
import * as path from 'path'
import { getFileName } from '@/utils/helpers'

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

  it('should cin.test.out run success', () => {
  })
})
