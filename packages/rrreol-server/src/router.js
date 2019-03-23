const Router = require('koa-router')

const router = new Router()

router.post('/submit', (ctx, next) => {
  const { id, code, lang } = ctx.body
  if (!id || !code || !lang) {
    ctx.statusCode = 500
    ctx.statusMessage = 'incorrect params'
    next()
  }
  // todo: compile code and run it with sandbox
  // ...
})
