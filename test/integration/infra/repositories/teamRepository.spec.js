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

const createMockCompany = async () => {
  const { companyRepository } = repository
  await companyRepository.destroy({ where: {} })
  return Promise.all([
    companyRepository.create({
      name: 'Super cool company'
    }),
    companyRepository.create({
      name: 'ABCD 123'
    })
  ])
}

describe('Integration: Repository: TeamRepository', () => {
  const { teamRepository } = repository
  let userEntity
  let companyEntity

  beforeEach(async () => {
    const [user1, user2] = await createMockUser()
    const [company1, company2] = await createMockCompany()
    await teamRepository
      .destroy({ where: {} })
    // eslint-disable-next-line no-unused-vars
    await Promise.all([
      teamRepository.create({
        contact_user: true,
        company_id: company1.id,
        user_id: user1.id
      }),
      teamRepository.create({
        contact_user: false,
        company_id: company2.id,
        user_id: user2.id
      })
    ])

    userEntity = user1.id
    companyEntity = company1.id
  })

  describe('Should call method correctly', () => {
    it('should getAll', async () => {
      const entities = await teamRepository.getAll()
      expect(entities).to.have.length(2)
    })

    it('should findOne return correct record', async () => {
      const entities = await teamRepository.findOne({ where: { user_id: userEntity, company_id: companyEntity } })
      expect(entities.user_id).to.equals(userEntity)
    })

    it('should update 1 record', async () => {
      const entities = await teamRepository.update({ contact_user: true }, { where: { user_id: userEntity, company_id: companyEntity }, returning: true, plain: true })
      // seq signature [1/0, dataValues]
      const getObject = last(entities)
      expect(getObject.contact_user).to.equals(true)
    })
  })
})
