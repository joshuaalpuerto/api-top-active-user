
const sinon = require('sinon')
const chai = require('chai')
const sinonChai = require('sinon-chai')
const expect = chai.expect
chai.should()
chai.use(sinonChai)

const App = require('src/app/')

describe('ApplicationStartup', () => {
  describe('Application startup', () => {
    describe('Success', () => {
      const server = {
        start: sinon.spy()
      }

      const database = {
        authenticate: () => true
      }

      it('should start ', async () => {
        const bootUp = App({ server, database })
        await bootUp.start()
        expect(server.start.calledOnce).to.equals(true)
      })
    })

    describe('Fails', () => {
      const server = {
        start: sinon.spy()
      }
      const database = {
        // eslint-disable-next-line prefer-promise-reject-errors
        authenticate: () => Promise.reject(new Error('Error'))
      }

      it('should start ', async () => {
        const bootUp = App({ server, database })
        let error
        try {
          await bootUp.start()
        } catch (e) {
          error = e.message
        }
        expect(error).to.equal('Error')
        expect(server.start.calledOnce).to.equals(false)
      })
    })
  })
})
