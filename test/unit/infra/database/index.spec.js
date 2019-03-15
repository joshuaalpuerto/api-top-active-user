
const sinon = require('sinon')
const chai = require('chai')
const sinonChai = require('sinon-chai')
const expect = chai.expect
chai.should()
chai.use(sinonChai)

const Database = require('src/infra/database')

describe('DatabaseStart', () => {
  describe('No config should fail', () => {
    const message = 'Database config file log not found, disabling database.'
    const logger = {
      error: sinon.spy()
    }

    const config = {}
    it('should start ', async () => {
      Database({ logger, config })
      expect(logger.error.calledWith(message)).to.equals(true)
    })
  })
})
