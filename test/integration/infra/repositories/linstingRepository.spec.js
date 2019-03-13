/* eslint-env mocha */
const { last } = require('ramda')
const { repository } = require('test/factory')

describe('Integration: Repository: ListingRepository', () => {
  const { userRepository, listingRepository } = repository
  let entityId

  beforeEach(async () => {
    // we need to add user before we can request our token
    await userRepository
      .destroy({ where: {} })
    const [user1, user2] = await Promise.all([
      userRepository.create({
        name: 'Super Dev'
      }),
      userRepository.create({
        name: 'John'
      })
    ])

    await listingRepository
      .destroy({ where: {} })

    // eslint-disable-next-line no-unused-vars
    const [_, listing2] = await Promise.all([
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

    entityId = listing2.id
  })

  describe('Should call method correctly', () => {
    it('should getAll', async () => {
      const entities = await listingRepository.getAll()
      expect(entities).to.have.length(2)
    })

    it('should findById return correct record', async () => {
      const entities = await listingRepository.findById(entityId)
      expect(entities.name).to.equals('Test Listing2')
    })

    it('should findOne return correct record', async () => {
      const entities = await listingRepository.findOne({ where: { id: entityId } })
      expect(entities.name).to.equals('Test Listing2')
    })

    it('should update 1 record', async () => {
      const entities = await listingRepository.update({ name: 'Test Listing Updated2' }, { where: { id: entityId }, returning: true, plain: true })
      // seq signature [1/0, dataValues]
      const getObject = last(entities)
      expect(getObject.name).to.equals('Test Listing Updated2')
    })
  })
})
