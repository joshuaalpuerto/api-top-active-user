const morgan = require('morgan')

const stream = (logger) => ({
  write: (message) => {
    logger.info(message.slice(0, -1))
  }
})

module.exports = {
  stream,
  Logger (logger) {
    return morgan('common', {
      stream: stream(logger)
    })
  }
}
