const fs = require('fs')
const path = require('path')
const childProcess = require('child_process')
//
const chalk = require('chalk')

const cli = path.resolve(__dirname, '../', 'index.js')
const examples = path.resolve(__dirname, './', 'examples')

console.log('CLI Path: ' + cli)

describe('examples test', () => {
  it('should example 01 run success', (done) => {
    const cp = runExample('01')
    cp.on('done', done)
  })
})

function runExample (name, args = []) {
  const dir = path.resolve(examples, name)
  const target = fs.readdirSync(dir).filter(file => /^test\[cpp|c|py|js]/.test(file))[0]
  if (args == null) {
    args = []
  } else if (typeof args === 'string') {
    args = args.split(' ')
  }
  console.log('on dir ' + dir + '\n' +
    'target file: ' + target)
  if (args.length > 0) {
    console.log('args: ' + args)
  }

  const cp = childProcess.spawn('node', [cli, target, ...args], {
    shell: true,
    cwd: dir,
    env: {
      'DEBUG': 'rrreol-debug'
    }
  })

  cp.on('message', console.log)
  cp.on('error', err => {
    throw err
  })
  cp.on('exit', code => {
    if (code === 0) {
      cp.emit('done', 0)
      console.log(chalk.green('success') + ' on: ' + name)
    } else {
      let message = 'Return: ' + code
      const stdout = cp.stdout.read()
      const stderr = cp.stderr.read()
      if (stdout != null) {
        message += '\n' + stdout
      }
      if (stderr != null) {
        message += '\n' + stderr
      }

      throw new Error(message)
    }
  })

  return cp
}
