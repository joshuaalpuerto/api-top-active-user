const t = require('tcomb')
const { compose } = require('ramda')
const { cleanData } = require('../helper')

const Team = t.struct({
  company_id: t.Number,
  user_id: t.Number,
  contact_user: t.Boolean
})

module.exports = compose(
  cleanData,
  Team
)
