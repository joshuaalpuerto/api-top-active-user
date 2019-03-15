/* eslint-env mocha */
const { compose } = require('ramda')
const { name, lorem } = require('faker')
const {
  models
} = require('test/factory')

const createUsers = async () => {
  const entityModel = compose(
    models
  )('users')

  await entityModel.destroy({ where: {} })

  return entityModel.sequelize.query(`
    insert into users (id, created_at, name) values
      (1, (now() - interval '175 days, 5 hours'), 'Alice'),
      (2, (now() - interval '154 days, 7 hours'), 'Bob'),
      (3, (now() - interval '124 days, 1 hours'), 'Carl'),
      (4, (now() - interval '101 days, 4 hours'), 'Daphne'),
      (5, (now() - interval '89 days, 6 hours'), 'Evan'),
      (6, (now() - interval '75 days, 2 hours'), 'Fabia'),
      (7, (now() - interval '175 days, 5 hours'), 'Laiba'),
      (8, (now() - interval '154 days, 7 hours'), 'Suman'),
      (9, (now() - interval '124 days, 1 hours'), 'Hanifa'),
      (10, (now() - interval '101 days, 4 hours'), 'Amelia-Mae'),
      (11, (now() - interval '89 days, 6 hours'), 'Beulah'),
      (12, (now() - interval '75 days, 2 hours'), 'Miles')
    ON CONFLICT (id)
    DO NOTHING
  ;
  `)
}

const createCompanies = async () => {
  const entityModel = compose(
    models
  )('companies')

  await entityModel.destroy({ where: {} })

  return entityModel.sequelize.query(`
    insert into companies (id, created_at, name) values
    (1, (now() - interval '250 days'), 'Facewall'),
    (2, (now() - interval '300 days, 2 hours'), 'Company & Co'),
    (3, (now() - interval '250 days'), 'Teletubbies Inc'),
    (4, (now() - interval '300 days, 2 hours'), 'Doraemon Corp')
  ON CONFLICT (id)
  DO NOTHING
  ;
  `)
}

const createListings = async () => {
  const entityModel = compose(
    models
  )('listings')

  await entityModel.destroy({ where: {} })

  return entityModel.sequelize.query(`
    insert into listings (id, created_at, created_by, name, description) values
    (1, (now() - interval '170 days'), 7, 'Join us conquering the world!', 'This is your best chance to be on the right side of the equation...'),
    (2, (now() - interval '170 days'), 7, '${name.jobTitle()}', '${name.jobDescriptor()}'),
    (3, (now() - interval '170 days'), 8, '${name.jobTitle()}', '${name.jobDescriptor()}'),
    (4, (now() - interval '170 days'), 8, '${name.jobTitle()}', '${name.jobDescriptor()}'),
    (5, (now() - interval '170 days'), 9, '${name.jobTitle()}', '${name.jobDescriptor()}'),
    (6, (now() - interval '170 days'), 9, '${name.jobTitle()}', '${name.jobDescriptor()}'),
    (7, (now() - interval '170 days'), 10, '${name.jobTitle()}', '${name.jobDescriptor()}'),
    (8, (now() - interval '170 days'), 10, '${name.jobTitle()}', '${name.jobDescriptor()}'),
    (9, (now() - interval '170 days'), 11, '${name.jobTitle()}', '${name.jobDescriptor()}'),
    (10, (now() - interval '170 days'), 11, '${name.jobTitle()}', '${name.jobDescriptor()}'),
    (11, (now() - interval '170 days'), 12, '${name.jobTitle()}', '${name.jobDescriptor()}'),
    (12, (now() - interval '170 days'), 12, '${name.jobTitle()}', '${name.jobDescriptor()}')
  ON CONFLICT (id)
  DO NOTHING
  ;
  `)
}

const createTeams = async () => {
  const entityModel = compose(
    models
  )('teams')

  await entityModel.destroy({ where: {} })

  return entityModel.sequelize.query(`
    insert into teams (company_id, user_id, contact_user) values
    (1, 1, TRUE),
    (2, 3, FALSE),
    (2, 4, TRUE)
  ON CONFLICT (company_id, user_id)
  DO NOTHING
  ;
  `)
}

const createApplications = async () => {
  const entityModel = compose(
    models
  )('applications')

  await entityModel.destroy({ where: {} })

  return entityModel.sequelize.query(`
  insert into applications (id, created_at, user_id, listing_id, cover_letter) values
  (1, (now() - interval '165 days'), 1, 1, '${lorem.paragraph()}'),
  (2, (now() - interval '164 days'), 1, 2, '${lorem.paragraph()}'),
  (3, (now() - interval '163 days'), 1, 3, '${lorem.paragraph()}'),
  (4, (now() - interval '163 days'), 1, 4, '${lorem.paragraph()}'),
  (5, (now() - interval '163 days'), 1, 5, '${lorem.paragraph()}'),
  (6, (now() - interval '163 days'), 1, 6, '${lorem.paragraph()}'),
  (7, (now() - interval '162 days'), 2, 1, '${lorem.paragraph()}'),
  (8, (now() - interval '162 days'), 2, 2, '${lorem.paragraph()}'),
  (9, (now() - interval '162 days'), 2, 3, '${lorem.paragraph()}'),
  (10, (now() - interval '162 days'), 2, 4, '${lorem.paragraph()}'),
  (11, (now() - interval '162 days'), 3, 3, '${lorem.paragraph()}'),
  (12, (now() - interval '162 days'), 3, 4, '${lorem.paragraph()}'),
  (13, (now() - interval '162 days'), 3, 5, '${lorem.paragraph()}'),
  (14, (now() - interval '161 days'), 3, 6, '${lorem.paragraph()}'),
  (15, (now() - interval '161 days'), 4, 5, '${lorem.paragraph()}'),
  (16, (now() - interval '161 days'), 4, 6, '${lorem.paragraph()}'),
  (17, (now() - interval '161 days'), 4, 7, '${lorem.paragraph()}'),
  (18, (now() - interval '161 days'), 5, 7, '${lorem.paragraph()}'),
  (19, (now() - interval '161 days'), 5, 8, '${lorem.paragraph()}'),
  (20, (now() - interval '160 days'), 5, 11, '${lorem.paragraph()}'),
  (21, (now() - interval '160 days'), 6, 11, '${lorem.paragraph()}'),
  (22, (now() - interval '160 days'), 7, 11, '${lorem.paragraph()}'),
  (23, (now() - interval '160 days'), 7, 12, '${lorem.paragraph()}'),
  (24, (now() - interval '160 days'), 7, 10, '${lorem.paragraph()}'),
  (25, (now() - interval '160 days'), 7, 9, '${lorem.paragraph()}'),
  (26, (now() - interval '160 days'), 7, 8, '${lorem.paragraph()}'),
  (27, (now() - interval '180 days'), 8, 3, '${lorem.paragraph()}'),
  (28, (now() - interval '180 days'), 8, 4, '${lorem.paragraph()}'),
  (29, (now() - interval '180 days'), 8, 5, '${lorem.paragraph()}'),
  (30, (now() - interval '180 days'), 9, 12, '${lorem.paragraph()}')
  ON CONFLICT (id)
  DO NOTHING
;
  ;
  `)
}

module.exports = {
  createUsers,
  createCompanies,
  createListings,
  createTeams,
  createApplications
}
