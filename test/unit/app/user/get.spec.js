
const { expect } = require('chai')
const getUsecase = require('src/app/user/get')

describe('App -> User -> Get', () => {
  let useCase
  const mockData = [{
    firstName: 'Test',
    lastName: 'Developer'
  }]

  const mockTopActive = [
    {
      'id': 8,
      'name': 'Suman',
      'createdAt': '2018-10-11T09:28:55.791Z',
      'count': 3,
      'listing': [
        {
          'name': 'Chief Branding Designer'
        },
        {
          'name': 'International Intranet Orchestrator'
        },
        {
          'name': 'Central Brand Executive'
        }
      ]
    },
    {
      'id': 4,
      'name': 'Daphne',
      'createdAt': '2018-12-03T12:28:55.791Z',
      'count': 3,
      'listing': [
        {
          'name': 'Central Brand Executive'
        },
        {
          'name': 'Product Data Producer'
        },
        {
          'name': 'District Mobility Executive'
        }
      ]
    },
    {
      'id': 6,
      'name': 'Fabia',
      'createdAt': '2018-12-29T14:28:55.791Z',
      'count': 1,
      'listing': [
        {
          'name': 'Internal Integration Planner'
        }
      ]
    },
    {
      'id': 9,
      'name': 'Hanifa',
      'createdAt': '2018-11-10T15:28:55.791Z',
      'count': 1,
      'listing': [
        {
          'name': 'Legacy Response Technician'
        }
      ]
    },
    {
      'id': 10,
      'name': 'Amelia-Mae',
      'createdAt': '2018-12-03T12:28:55.791Z',
      'count': 0,
      'listing': null
    }
  ]

  describe('all', () => {
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

  describe('getTopActiveUser', () => {
    describe('Success path', () => {
      beforeEach(() => {
        const MockRepository = {
          getTopActiveUsers: () => mockTopActive
        }

        useCase = getUsecase({
          userRepository: MockRepository
        })
      })

      it('should display all the records on success', async () => {
        const lists = await useCase.getTopActiveUser({ queryParams: {} })
        expect(lists).to.equal(mockTopActive)
      })
    })

    describe('Fail path', () => {
      beforeEach(() => {
        const MockRepository = {
          // eslint-disable-next-line prefer-promise-reject-errors
          getTopActiveUsers: () => Promise.reject('Error')
        }

        useCase = getUsecase({
          userRepository: MockRepository
        })
      })

      it('should display error on rejection', async () => {
        let error
        try {
          await useCase.getTopActiveUser({ queryParams: {} })
        } catch (e) {
          error = e.message
        }
        expect(error).to.equal('Error')
      })
    })
  })
})
