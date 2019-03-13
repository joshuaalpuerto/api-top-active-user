const models = (name) => app.resolve('database').models[name]

const repository = app.resolve('repository')

module.exports = {
  models,
  repository
}
