/* eslint-env mocha */
const { models } = require('test/factory')

describe('Routes: GET Users', () => {
  const BASE_URI = `/api/${config.version}`

  const UserUseCase = models('users')

  beforeEach((done) => {
    // we need to add user before we can request our token
    UserUseCase
      .destroy({ where: {} })
      .then(() =>
        UserUseCase.create({
          name: 'Super Dev'
        })
      ).then(() =>
        UserUseCase.create({
          name: 'John'
        })
      ).then(() => done())
  })

  describe('Should return users', () => {
    it('should return all users', (done) => {
      request.get(`${BASE_URI}/users`)
        .expect(200)
        .end((err, res) => {
          expect(res.body.data).to.have.length(2)
          done(err)
        })
    })
  })
})
