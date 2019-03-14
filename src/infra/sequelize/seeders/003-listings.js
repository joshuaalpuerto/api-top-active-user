const { name } = require('faker')

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.sequelize.query(`
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
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('listings', null, {})
  }
}
