import * as cp from 'child_process'
import * as path from 'path'
import { isString } from 'lodash'
import { compilerConfig } from './utils'

// todo
export class Runner {
  constructor (props) {
    if (isString(props)) {
      this.__program = {
        path: path.resolve(props)
      }
    } else {
      const { name } = props
    }
  }

  async exec () {

  }
}

export default Runner
