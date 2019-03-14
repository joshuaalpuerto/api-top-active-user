module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.sequelize.query(`
      insert into companies (id, created_at, name) values
        (1, (now() - interval '250 days'), 'Facewall'),
        (2, (now() - interval '300 days, 2 hours'), 'Company & Co'),
        (3, (now() - interval '250 days'), 'Teletubbies Inc'),
        (4, (now() - interval '300 days, 2 hours'), 'Doraemon Corp')
      ON CONFLICT (id)
      DO NOTHING
      ;
    `)
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('companies', null, {})
  }
}
