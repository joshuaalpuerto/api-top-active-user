const { UserParams } = require('src/domain/user')

/**
  * function for getter user.
  */
module.exports = ({ userRepository }) => {
  // code for getting all the items
  const all = ({ queryParams }) => {
    return Promise
      .resolve()
      .then(() => {
        const { page, userId } = UserParams(queryParams).format()
        return userRepository.getAllDetailView({ userId, page })
      })
      .catch(error => {
        throw new Error(error)
      })
  }

  const getTopActiveUser = ({ queryParams }) => {
    return Promise
      .resolve()
      .then(async () => {
        const { page } = UserParams(queryParams).format()
        return userRepository.getTopActiveUsers({ page })
      })
      .catch(error => {
        throw new Error(error)
      })
  }

  return {
    all,
    getTopActiveUser
  }
}
