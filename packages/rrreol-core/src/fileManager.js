import chalk from 'chalk'
import fs from 'fs-extra'
import memoizeOne from 'memoize-one'
import { empty, join, isNil } from 'ramda'
import { CLRFtoLF } from './utils'

export class FileManager {
  constructor (path) {
    this.__content = null
    this.filePath = path || null

    if (fs.existsSync(path)) {
      this.__content = fs.readFileSync(path)
        .toString()
        .split('\n')
    }
  }

  static save = async (path, content) => {
    await fs.writeFile(path, content)
  }

  content = memoizeOne((content = this.__content) => {
    if (isNil(content)) {
      return empty('')
    } else {
      return join('\n')(content)
    }
  })

  save = async (path) => {
    if (!isNil(path)) {
      await FileManager.save(path, this.content())
    } else {
      await fs.writeFile(this.filePath, this.content())
    }
  }

  read = async (path) => {
    this.__content = await fs.readFile(path)
      .then(res =>
        res.toString().split('\n'))
  }

  line = (line) => {
    if (line < 0 || line > (this.__content?.length || Number.MIN_VALUE)) {
      console.log(chalk.red('error'))
      return ''
    } else {
      return CLRFtoLF(this.__content[line - 1])
    }
  }

  lines = () => this.__content?.length || 0
}

export default FileManager
