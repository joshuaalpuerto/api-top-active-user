/* eslint-env mocha */
const { repository } = require('test/factory')

describe('Routes: GET Users', () => {
  const BASE_URI = `/api/${config.version}`

  const { userRepository } = repository

  beforeEach((done) => {
    // we need to add user before we can request our token
    userRepository
      .destroy({ where: {} })
      .then(() =>
        userRepository.create({
          name: 'Super Dev'
        })
      ).then(() =>
        userRepository.create({
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
