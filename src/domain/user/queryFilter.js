const t = require('tcomb')
const { compose, multiply } = require('ramda')
const { cleanData } = require('../helper')

/**
 * Accept string instead of number
 * due to nature of querystring wrapped always to string
 */
const UserParams = t.struct({
  page: t.maybe(t.String),
  userId: t.maybe(t.String)
})

UserParams.prototype.format = function () {
  this.page = multiply(5, this.page || 0)
  this.userId = this.userId ? parseInt(this.userId) : null

  return this
}

exports.UserParams = compose(
  cleanData,
  UserParams
)
