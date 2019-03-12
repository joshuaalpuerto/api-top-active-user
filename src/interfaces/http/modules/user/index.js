const container = require('src/container')
const router = require('./router')
const instance = require('./instance')

module.exports = () => {
  const { logger, auth, response: { Success, Fail } } = container.cradle
  const app = instance()

  return {
    app,
    router: router({ logger, auth, response: { Success, Fail }, ...app })
  }
}
