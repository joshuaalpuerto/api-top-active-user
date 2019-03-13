/* eslint-env mocha */
const { last } = require('ramda')
const { repository } = require('test/factory')

describe('Integration: Repository: CompanyRepository', () => {
  const { companyRepository } = repository
  let entityId

  beforeEach((done) => {
    // we need to add user before we can request our token
    companyRepository
      .destroy({ where: {} })
      .then(() =>
        companyRepository.create({
          name: 'Super cool company'
        })
      ).then(() =>
        companyRepository.create({
          name: 'ABCD 123'
        })
      ).then((entity) => {
        entityId = entity.id
        done()
      })
  })

  describe('Should call method correctly', () => {
    it('should getAll', async () => {
      const entities = await companyRepository.getAll()
      expect(entities).to.have.length(2)
    })

    it('should findById return correct record', async () => {
      const entities = await companyRepository.findById(entityId)
      expect(entities.name).to.equals('ABCD 123')
    })

    it('should findOne return correct record', async () => {
      const entities = await companyRepository.findOne({ where: { id: entityId } })
      expect(entities.name).to.equals('ABCD 123')
    })

    it('should update 1 record', async () => {
      const entities = await companyRepository.update({ name: 'ABCD 45' }, { where: { id: entityId }, returning: true, plain: true })
      // seq signature [1/0, dataValues]
      const getObject = last(entities)
      expect(getObject.name).to.equals('ABCD 45')
    })
  })
})
