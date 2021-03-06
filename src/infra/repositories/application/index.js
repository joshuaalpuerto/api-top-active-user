const { toEntity } = require('./transform')

module.exports = ({ model }) => {
  const getAll = () =>
    model.findAll({
      attributes: [
        'id', 'listing_id', 'user_id', 'cover_letter', 'created_at'
      ]
    }).then((entity) =>
      entity.map((data) => {
        const { dataValues } = data
        return toEntity(dataValues)
      })
    )

  const create = (...args) =>
    model.create(...args).then(({ dataValues }) => toEntity(dataValues))

  const update = (...args) =>
    model.update(...args)
      .catch((error) => { throw new Error(error) })

  const findById = (...args) =>
    model.findByPk(...args)
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
    create,
    update,
    findById,
    findOne,
    destroy
  }
}
