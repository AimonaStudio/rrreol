import fs from 'fs-extra'
import { join } from 'path'
import { isString } from 'lodash'

export function removeFiles (path, name) {
  if (isString(path) === false || fs.existsSync(path) === false) {
    throw new TypeError(path)
  }
  if (name instanceof RegExp) {
    fs.readdirSync(path, { withFileTypes: true })
      .forEach(file =>
        file.isFile() &&
        name.test(file.name) &&
        fs.removeSync(join(path, file.name))
      )
  } else if (isString(name)) {
    fs.removeSync(join(path, name))
  } else if (Array.isArray(name)) {
    name.forEach(v => removeFiles(path, v))
  } else {
    throw new TypeError(name)
  }
}
