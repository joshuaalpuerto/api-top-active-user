/* eslint-env mocha */
const { last } = require('ramda')
const { repository } = require('test/factory')

describe('Integration: Repository: UserRepository', () => {
  const { userRepository } = repository
  let entityId

  beforeEach((done) => {
    // we need to add user before we can request our token
    userRepository
      .destroy({ where: {} })
      .then(() =>
        userRepository.create({
          name: 'Super Dev'
        })
      ).then(() =>
        userRepository.create({
          name: 'John'
        })
      ).then((entity) => {
        entityId = entity.id
        done()
      })
  })

  describe('Should call method correctly', () => {
    it('should getAll', async () => {
      const entities = await userRepository.getAll()
      expect(entities).to.have.length(2)
    })

    it('should findById return correct record', async () => {
      const entities = await userRepository.findById(entityId)
      expect(entities.name).to.equals('John')
    })

    it('should findOne return correct record', async () => {
      const entities = await userRepository.findOne({ where: { id: entityId } })
      expect(entities.name).to.equals('John')
    })

    it('should update 1 record', async () => {
      const entities = await userRepository.update({ name: 'test' }, { where: { id: entityId }, returning: true, plain: true })
      // seq signature [1/0, dataValues]
      const getObject = last(entities)
      expect(getObject.name).to.equals('test')
    })
  })
})
