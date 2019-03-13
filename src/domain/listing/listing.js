const t = require('tcomb')
const { compose } = require('ramda')
const { cleanData } = require('../helper')

const Listing = t.struct({
  id: t.maybe(t.Number),
  name: t.String,
  description: t.String,
  created_by: t.Number,
  created_at: t.maybe(t.Date)
})

module.exports = compose(
  cleanData,
  Listing
)
