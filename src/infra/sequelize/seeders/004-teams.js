module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.sequelize.query(`
    insert into teams (company_id, user_id, contact_user) values
      (1, 1, TRUE),
      (2, 3, FALSE),
      (2, 4, TRUE)
    ;
    `)
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('listings', null, {})
  }
}
