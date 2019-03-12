const t = require('tcomb')
const { compose } = require('ramda')
const { cleanData } = require('../helper')

const User = t.struct({
  id: t.maybe(t.String),
  name: t.String,
  createdAt: t.maybe(t.Date),
})

module.exports = compose(
  cleanData,
  User
)
