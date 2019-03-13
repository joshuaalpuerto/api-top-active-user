module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.sequelize.query(`
      insert into applications (id, created_at, user_id, listing_id, cover_letter) values
      (1, (now() - interval '165 days'), 2, 1, 'Hello, I am Bob'),
      (2, (now() - interval '164 days'), 5, 1, 'Hello, I am Evan')
    ;
    `)
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('listings', null, {})
  }
}
