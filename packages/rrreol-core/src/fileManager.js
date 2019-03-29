import fs from 'fs-extra'

export class FileManager {
  constructor (path) {
    if (fs.existsSync(path)) {
      this.__content = fs.readFileSync(path).toString()
    }
    this.filePath = path || ''
  }

  save = async () => {
    return fs.writeFile(this.filePath)
  }

  lines = () => {
    return this.__content.split('\n').length
  }
}

export default FileManager
