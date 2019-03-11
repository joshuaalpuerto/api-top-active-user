/* eslint-env mocha */
const { compose } = require('ramda')
const { models, repository } = require('test/factory')
const userRepository = require('src/infra/repositories/user')

describe('Routes: POST Users', () => {
  const BASE_URI = `/api/${config.version}`

  const UserUseCase = compose(
    repository(userRepository),
    models
  )('users')

  const signIn = app.resolve('jwt').signin()
  let token

  beforeEach((done) => {
    // we need to add user before we can request our token
    UserUseCase
      .destroy({ where: {} })
      .then(() =>
        UserUseCase.create({
          firstName: 'Test',
          lastName: 'Dev',
          middleName: 'Super Dev',
          email: 'testdev1@gmail.com',
          password: 'pass',
          roleId: 1,
          isDeleted: 0,
          createdBy: '48e40a9c-c5e9-4d63-9aba-b77cdf4ca67b'
        })
      ).then((user) => {
        token = signIn({
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          middleName: user.middleName,
          email: user.email
        })
        done()
      })
  })

  describe('Should post users', () => {
    it('should return create user', (done) => {
      request.post(`${BASE_URI}/users`)
        .set('Authorization', `JWT ${token}`)
        .send({
          firstName: 'John',
          lastName: 'Doe',
          middleName: 'JohnDoe',
          email: 'johndoe@mgail.com.com',
          roleId: 1,
          isDeleted: 0,
          createdBy: '48e40a9c-c5e9-4d63-9aba-b77cdf4ca67b'
        })
        .expect(200)
        .end((err, res) => {
          expect(res.body.data.firstName).to.eql('John')
          expect(res.body.data.lastName).to.eql('Doe')
          expect(res.body.data.email).to.eql('johndoe@mgail.com.com')
          done(err)
        })
    })

    it('should validate user object is not complete', (done) => {
      request.post(`${BASE_URI}/users`)
        .set('Authorization', `JWT ${token}`)
        .send({
          firstName: 'John',
          lastName: 'Doe',
          middleName: 'JohnDoe'
        })
        .expect(400)
        .end((err, res) => {
          expect(res.body).to.include.keys('error')
          done(err)
        })
    })
  })
})
