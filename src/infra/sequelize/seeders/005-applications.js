const { lorem } = require('faker')
module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.sequelize.query(`
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
    `)
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('listings', null, {})
  }
}
