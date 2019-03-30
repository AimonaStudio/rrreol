import chalk from 'chalk'
import fs from 'fs-extra'
import { isNil } from 'ramda'

export class FileManager {
  constructor (path) {
    if (fs.existsSync(path)) {
      this.__content = fs.readFileSync(path)
        .toString()
        .split('\n')
    }
    this.filePath = path || ''
  }

  static save = async (path, content) => {
    await fs.writeFile(path, content)
  }

  save = async (path) => {
    if (!isNil(path)) {
      await FileManager.save(path, this.__content)
    } else {
      await fs.writeFile(this.filePath, this.__content)
    }
  }

  read = async (path) => {
    this.__content = await fs.readFile(path)
      .then(res =>
        res.toString().split('\n'))
  }

  line = (line) => {
    if (line < 0 || line > this.__content.length) {
      console.log(chalk.red('error'))
    }
  }

  lines = () => this.__content.length
}

export default FileManager
