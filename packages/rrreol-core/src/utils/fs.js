import { existsSync, readdirSync, removeSync } from 'fs-extra'
import { join } from 'path'
import { isString } from 'lodash'

export function removeFiles (path, name) {
  if (isString(path) === false || existsSync(path) === false) {
    throw new TypeError(path)
  }
  if (name instanceof RegExp) {
    readdirSync(path, { withFileTypes: true })
      .forEach(file =>
        file.isFile() &&
        name.test(file.name) &&
        removeSync(join(path, file.name))
      )
  } else if (isString(name)) {
    removeSync(join(path, name))
  } else if (Array.isArray(name)) {
    name.forEach(v => removeFiles(path, v))
  } else {
    throw new TypeError(name)
  }
}
