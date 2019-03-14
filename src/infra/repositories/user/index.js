const { toEntity } = require('./transform')

module.exports = ({ model }) => {
  const getAll = () =>
    model.findAll({
      attributes: [
        'id', 'name', 'created_at'
      ]
    }).then((entity) =>
      entity.map((data) => {
        const { dataValues } = data
        return toEntity(dataValues)
      })
    )

  const getTopActiveUsers = ({
    page = 0,
    limit = 5
  }) => {
    return model.sequelize.query('select * from  sp_get_top_active_users(:params )', { type: model.sequelize.QueryTypes.SELECT,
      replacements: { params: [
        page,
        limit
      ] } })
  }

  const create = (...args) =>
    model.create(...args).then(({ dataValues }) => toEntity(dataValues))

  const update = (...args) =>
    model.update(...args)
      .catch((error) => { throw new Error(error) })

  const findById = (...args) =>
    model.findById(...args)
      .then(({ dataValues }) => toEntity(dataValues))
      .catch((error) => { throw new Error(error) })

  const findOne = (...args) =>
    model.findOne(...args)
      .then(({ dataValues }) => toEntity(dataValues))
      .catch((error) => { throw new Error(error) })

  const destroy = (...args) =>
    model.destroy(...args)

  return {
    getAll,
    getTopActiveUsers,
    create,
    update,
    findById,
    findOne,
    destroy
  }
}
