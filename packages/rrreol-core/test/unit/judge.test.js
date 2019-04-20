import { resolve } from 'path'
import Judge from '@/judge'
import FileManager from '@/fileManager'
import { removeFiles } from '@/utils'

describe('Judge base test', () => {
  let judge = null

  beforeEach(() => {
    judge = new Judge()
  })

  it('should have correct props', () => {
    expect(judge.__config.ignoreEndEnter).toBe(true)
  })

  it('should throw error when invoke get method', () => {
    expect(() => {
      judge.targetFile = 1
    }).toThrowError(Error)
  })

  it('should be array on some properties', () => {
    expect(Array.isArray(judge.__outputs)).toBe(true)
    expect(Array.isArray(judge.__inputs)).toBe(true)
  })
})

describe('Judge check test', () => {
  const fixturesPath = resolve(__dirname, '..', 'fixtures')
  const basePath = resolve(fixturesPath, 'base.cpp')
  let judge = null

  beforeEach(() => {
    judge = new Judge()
  })

  it('should throw error when incorrect props on function test', () => {
    expect(() => judge.test()).toThrowError(TypeError)
    expect(() => judge.test('')).toThrowError(TypeError)
    expect(() => judge.test(null)).toThrowError(TypeError)
    expect(() => judge.test(undefined)).toThrowError(TypeError)
  })

  it('should return itself', () => {
    expect(judge.test(basePath)).toBe(judge)
  })

  it('should return fileManage instance', () => {
    expect(judge.input).toBeInstanceOf(Function)
    expect(judge.in).toBeInstanceOf(Function)
    expect(judge.input(1)).toBeInstanceOf(FileManager)
    expect(judge.input(1) === judge.__inputs[0]).toBe(true)
    expect(judge.in(1) === judge.__inputs[0]).toBe(true)

    expect(judge.output).toBeInstanceOf(Function)
    expect(judge.out).toBeInstanceOf(Function)
    expect(judge.output(1)).toBeInstanceOf(FileManager)
    expect(judge.output(1) === judge.__outputs[0]).toBe(true)
    expect(judge.out(1) === judge.__outputs[0]).toBe(true)
  })

  it('should get correct line content', async () => {
    const printInputPath = resolve(fixturesPath, 'print-input.cpp')
    judge.in(1).loadContent('1 2')
    judge.out(1).loadContent('1 2')
    await judge.test(printInputPath).exec()
    expect(judge.answer(1).content).toEqual('1 2')
  })

  it('should emit check running success', () => {
    const fm1 = FileManager.of().loadContent('1\n2\n')
    const fm2 = FileManager.of().loadContent('1\n2\n')
    judge.rawListeners('check')
      .map(f => f(fm1, fm2))
      .every(v => expect(v).toBeTruthy())
  })

  afterAll(() => {
    removeFiles(fixturesPath, /\.test\.out$/)
  })
})

describe('Judge check park', () => {
  let judge = null
  beforeEach(() => {
    judge = new Judge()
  })

  it('should compare success', () => {
    const success = judge.compareFileManager(
      FileManager.of().loadContent('1'),
      FileManager.of().loadContent('1')
    )
    expect(success).toBe(true)
  })

  it('should compare fail', () => {
    const fail = judge.compareFileManager(
      FileManager.of().loadContent('1'),
      FileManager.of().loadContent('2')
    )
    expect(fail).toBe(false)
  })
})
