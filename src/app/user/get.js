const { UserParams } = require('src/domain/user')

/**
  * function for getter user.
  */
module.exports = ({ userRepository }) => {
  // code for getting all the items
  const all = () => {
    return Promise
      .resolve()
      .then(() =>
        userRepository.getAll()
      )
      .catch(error => {
        throw new Error(error)
      })
  }

  const getTopActiveUser = ({ filters = {} } = {}) => {
    return Promise
      .resolve()
      .then(async () => {
        const { page } = UserParams({
          page: parseInt(filters.page)
        }).format()
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
