import chalk from 'chalk'
import { isFunction } from 'lodash'
import { equals, isNil } from 'ramda'

export class JudgeWrapper {
  static of (val) {
    // called by `call()` or `apply()`
    return new JudgeWrapper(val, this)
  }

  constructor (val, target) {
    if (isNil(val)) {
      throw TypeError('val is null')
    }
    this.__target = target || null
    this.__val = val
  }

  toBe = (val) => {
    if ('on' in this.__target) {
      this.__target.on('finished', (answer) => {

      })
    } else {
      throw new Error('no property \'on\'')
    }
    return this.__target
  }
}

export default JudgeWrapper
