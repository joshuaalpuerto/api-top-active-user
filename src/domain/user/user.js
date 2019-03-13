const t = require('tcomb')
const { compose } = require('ramda')
const { cleanData } = require('../helper')

const User = t.struct({
  id: t.maybe(t.Number),
  name: t.String,
  created_at: t.maybe(t.Date)
})

module.exports = compose(
  cleanData,
  User
)
