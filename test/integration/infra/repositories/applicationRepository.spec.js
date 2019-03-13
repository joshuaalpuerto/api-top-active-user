/* eslint-env mocha */
const { last } = require('ramda')
const { repository } = require('test/factory')

const createMockUser = async () => {
  const { userRepository } = repository
  await userRepository.destroy({ where: {} })
  return Promise.all([
    userRepository.create({
      name: 'Super Dev'
    }),
    userRepository.create({
      name: 'John'
    })
  ])
}

const createMockListing = async ({ user1, user2 }) => {
  const { listingRepository } = repository
  await listingRepository.destroy({ where: {} })
  return Promise.all([
    listingRepository.create({
      name: 'Test Listing1',
      description: 'Test Listing Description',
      created_by: user1.id
    }),
    listingRepository.create({
      name: 'Test Listing2',
      description: 'Test Listing Description',
      created_by: user2.id
    })
  ])
}

describe('Integration: Repository: ApplicationRepository', () => {
  const { applicationRepository } = repository
  let entityId

  beforeEach(async () => {
    const [user1, user2] = await createMockUser()
    const [listing1, listing2] = await createMockListing({ user1, user2 })

    await applicationRepository
      .destroy({ where: {} })
    // eslint-disable-next-line no-unused-vars
    const [_, application2] = await Promise.all([
      applicationRepository.create({
        cover_letter: 'Hi im user 1',
        listing_id: listing1.id,
        user_id: user1.id
      }),
      applicationRepository.create({
        cover_letter: 'Hi im user 2',
        listing_id: listing2.id,
        user_id: user2.id
      })
    ])

    entityId = application2.id
  })

  describe('Should call method correctly', () => {
    it('should getAll', async () => {
      const entities = await applicationRepository.getAll()
      expect(entities).to.have.length(2)
    })

    it('should findById return correct applicationRepository', async () => {
      const entities = await applicationRepository.findById(entityId)
      expect(entities.cover_letter).to.equals('Hi im user 2')
    })

    it('should findOne return correct record', async () => {
      const entities = await applicationRepository.findOne({ where: { id: entityId } })
      expect(entities.cover_letter).to.equals('Hi im user 2')
    })

    it('should update 1 record', async () => {
      const entities = await applicationRepository.update({ cover_letter: 'Experienced developer' }, { where: { id: entityId }, returning: true, plain: true })
      // seq signature [1/0, dataValues]
      const getObject = last(entities)
      expect(getObject.cover_letter).to.equals('Experienced developer')
    })
  })
})
