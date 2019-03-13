module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.sequelize.query(`
    insert into listings (id, created_at, created_by, name, description) values
      (1, (now() - interval '170 days'), 1, 'Join us conquering the world!', 'This is your best chance to be on the right side of the equation...')
    ;
    `)
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('listings', null, {})
  }
}
