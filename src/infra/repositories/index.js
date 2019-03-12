const UserRepository = require('./user')

module.exports = ({ database }) => {
  const userModel = database.models.users
  return {
    userRepository: UserRepository({ model: userModel })
  }
}
