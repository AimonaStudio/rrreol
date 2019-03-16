import { isArray, isFunction, isString } from 'lodash'

export class JudgeWrapper {
  static of (val) {
    // called by `call()` or `apply()`
    return new JudgeWrapper(val, this)
  }

  constructor (val, target) {
    this.__target = target
    this.__val = val
  }

  toBe (val) {
    // todo: resolve `val`

    if (isFunction(this.__val)) {
      this.__val.apply(this.__target, [val])
    } else if (isString(this.__val)) {
      // todo
    } else if (isArray(this.__val)) {
      // todo
    }
    return this.__target
  }
}

export default JudgeWrapper
