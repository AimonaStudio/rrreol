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
    // todo: resolve `val`
    let res = true
    if (isFunction(this.__val)) {
      res = this.__val.apply(this.__target, [val])
    } else {
      res = equals(this.__val, val)
    }
    if (!res) {
      // todo: other handle
      // fixme: incorrect solution
      console.log(`${chalk.red('error')}`)
    } else {
      // todo
    }
    return this.__target
  }
}

export default JudgeWrapper
