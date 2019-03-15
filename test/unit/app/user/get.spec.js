
const { expect } = require('chai')
const getUsecase = require('src/app/user/get')

describe('App -> User -> Get', () => {
  let useCase
  const mockData = [{
    firstName: 'Test',
    lastName: 'Developer'
  }]

  describe('Success path', () => {
    beforeEach(() => {
      const MockRepository = {
        getAllDetailView: () => mockData
      }

      useCase = getUsecase({
        userRepository: MockRepository
      })
    })

    it('should display all the records on success', async () => {
      const lists = await useCase.all({ queryParams: {} })
      expect(lists).to.equal(mockData)
    })
  })

  describe('Fail path', () => {
    beforeEach(() => {
      const MockRepository = {
        // eslint-disable-next-line prefer-promise-reject-errors
        getAllDetailView: () => Promise.reject('Error')
      }

      useCase = getUsecase({
        userRepository: MockRepository
      })
    })

    it('should display error on rejection', async () => {
      let error
      try {
        await useCase.all({ queryParams: {} })
      } catch (e) {
        error = e.message
      }
      expect(error).to.equal('Error')
    })
  })
})
