const t = require('tcomb')
const { compose, multiply } = require('ramda')
const { cleanData } = require('../helper')

const UserParams = t.struct({
  page: t.maybe(t.Number)
})

UserParams.prototype.format = function () {
  this.page = multiply(5, this.page)

  return this
}

exports.UserParams = compose(
  cleanData,
  UserParams
)
