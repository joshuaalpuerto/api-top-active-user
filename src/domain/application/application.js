const t = require('tcomb')
const { compose } = require('ramda')
const { cleanData } = require('../helper')

const Application = t.struct({
  id: t.maybe(t.Number),
  user_id: t.Number,
  listing_id: t.Number,
  cover_letter: t.String,
  created_at: t.maybe(t.Date)
})

module.exports = compose(
  cleanData,
  Application
)
