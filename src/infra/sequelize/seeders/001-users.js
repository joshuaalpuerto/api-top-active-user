module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.sequelize.query(`
      insert into users (id, created_at, name) values
        (1, (now() - interval '175 days, 5 hours'), 'Alice'),
        (2, (now() - interval '154 days, 7 hours'), 'Bob'),
        (3, (now() - interval '124 days, 1 hours'), 'Carl'),
        (4, (now() - interval '101 days, 4 hours'), 'Daphne'),
        (5, (now() - interval '89 days, 6 hours'), 'Evan'),
        (6, (now() - interval '75 days, 2 hours'), 'Fabia')
      ON CONFLICT (id)
      DO NOTHING
    ;
    `)
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('users', null, {})
  }
}
