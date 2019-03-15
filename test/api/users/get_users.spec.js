/* eslint-env mocha */
const { head } = require('ramda')
const {
  createUsers,
  createListings,
  createApplications
} = require('./helper_creator')

describe('Routes: GET UsersTopActive', () => {
  const BASE_URI = `/api/${config.version}`
  beforeEach(async () => {
    // we need to add user before we can request our token
    await createUsers()
    await createListings()
    await createApplications()
  })

  describe('Should return users', () => {
    it('should return paginated users', (done) => {
      request.get(`${BASE_URI}/users`)
        .expect(200)
        .end((err, res) => {
          expect(res.body.data).to.have.length(5)
          done(err)
        })
    })

    describe('topActiveUsers', (done) => {
      it('should return 5 users by default', (done) => {
        request.get(`${BASE_URI}/users/topActiveUsers`)
          .expect(200)
          .end((err, res) => {
            expect(res.body.data).to.have.length(5)
            done(err)
          })
      })

      it('should return 5 users by default with 6 count as the highest', (done) => {
        request.get(`${BASE_URI}/users/topActiveUsers`)
          .expect(200)
          .end((err, res) => {
            const topUser = head(res.body.data)
            expect(topUser.count).to.equals(6)
            done(err)
          })
      })

      it('should return 5 users by default with 3 count as the highest since page 1', (done) => {
        request.get(`${BASE_URI}/users/topActiveUsers?page=1`)
          .expect(200)
          .end((err, res) => {
            const topUser = head(res.body.data)
            expect(topUser.count).to.equals(3)
            done(err)
          })
      })
    })
  })
})
