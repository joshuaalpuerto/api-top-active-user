'use strict'
module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.createTable('applications', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      listing_id: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      cover_letter: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW')
      }
    }).then(() => {
      return queryInterface.sequelize.query(`
        ALTER TABLE "applications" ADD
        CONSTRAINT "applications_listings_fkey"
        FOREIGN KEY ("listing_id")
        REFERENCES "listings" ("id")
        ON DELETE CASCADE;
      `)
    }).then(() => {
      return queryInterface.sequelize.query(`
        ALTER TABLE "applications" ADD
        CONSTRAINT "applications_users_fkey"
        FOREIGN KEY ("user_id")
        REFERENCES "users" ("id")
        ON DELETE CASCADE;
      `)
    })
  },
  down: function (queryInterface) {
    return queryInterface.dropTable('applications')
  }
}
