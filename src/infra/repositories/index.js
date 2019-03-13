const User = require('./user')
const Company = require('./company')
const Listing = require('./listing')
const Team = require('./team')
const Application = require('./application')

module.exports = ({ database }) => {
  const userModel = database.models.users
  const companyModel = database.models.companies
  const listingModel = database.models.listings
  const teamModel = database.models.teams
  const applicationModel = database.models.applications

  return {
    userRepository: User({ model: userModel }),
    companyRepository: Company({ model: companyModel }),
    listingRepository: Listing({ model: listingModel }),
    teamRepository: Team({ model: teamModel }),
    applicationRepository: Application({ model: applicationModel })
  }
}
