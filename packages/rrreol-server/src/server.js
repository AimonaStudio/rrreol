const Koa = require('koa')
const KoaBody = require('koa-body')

function createServer (conf) {
  const { port = 3000 } = conf
  const app = new Koa()
  app.use(KoaBody())
  app.listen(port)
  return app
}

module.exports = {
  createServer
}
