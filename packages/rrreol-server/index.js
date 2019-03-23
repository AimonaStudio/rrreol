const server = require('./src/server')

const defaultConfig = {
  port: 4000
}

const app = server.createServer(defaultConfig)
