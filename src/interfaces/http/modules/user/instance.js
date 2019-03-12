
const container = require('src/container') // we have to get the DI
const { get } = require('src/app/user')

module.exports = () => {
  const { repository: { userRepository } } = container.cradle

  const getUseCase = get({ userRepository })

  return {
    getUseCase
  }
}
