import { isString } from 'lodash'
import { curry } from 'ramda'
import { EventEmitter } from 'events'
import { JudgeWrapper } from './judgeWrapper'

export class Judge extends EventEmitter {
  constructor (props) {
    super()
    let config = {}
    if (isString(props)) {
      config = {

      }
    }
  }

  exec () {
  }

  line (val) {
    return JudgeWrapper.of.call(this, val)
  }

  lines () {
    const count = 1 // fixme: bind the real val
    return JudgeWrapper.of.call(this, curry((val) => {
      return val === count
    }))
  }

  maxline () {
    const count = 1 // fixme: bind the real val
    return JudgeWrapper.of.call(this, curry((val) => {
      return val >= count
    }))
  }

  minline () {
    const count = 2 // fixme: bind the real val
    return JudgeWrapper.of.call(this, curry((val) => {
      return val <= count
    }))
  }
}

export default Judge
