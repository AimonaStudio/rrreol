export class JudgeWrapper {
  constructor (val, target) {
    this.__target = target
    this.__val = val
  }

  toBe (val) {
    // todo
    // check val
    return this.__target
  }
}

export default JudgeWrapper
