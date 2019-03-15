import { EventEmitter } from 'events'
import { JudgeWrapper } from './judgeWrapper'
import { isString } from './utils'

export class Judge extends EventEmitter {
  constructor (props) {
    super()
    this.__program = {
      output: []
    }
    if (isString(props)) {
      this.__config = {
        path: props
      }
    } else {
      // todo
      this.__config = Object.assign({}, props)
    }
  }

  line (num) {
    return new JudgeWrapper(this?.__program?.output[num + 1] || null, this)
  }

  maxline () {
    return new JudgeWrapper(this?.__program?.output.length || -1, this)
  }
}

export default Judge
