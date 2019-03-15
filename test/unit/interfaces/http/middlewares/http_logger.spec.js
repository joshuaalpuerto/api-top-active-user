
const sinon = require('sinon')
const chai = require('chai')
const sinonChai = require('sinon-chai')
const expect = chai.expect
chai.should()
chai.use(sinonChai)

const { stream } = require('src/interfaces/http/middlewares/http_logger')

describe('Middleware -> HttpLogger', () => {
  describe('No config should fail', () => {
    const logger = {
      info: sinon.spy()
    }

    it('should log info once stream is invoked ', async () => {
      // messages from logs always have space so remove it
      const message = 'Test message '
      const logs = stream(logger)
      logs.write(message)
      expect(logger.info.calledWith(message.slice(0, -1))).to.equals(true)
    })
  })
})
