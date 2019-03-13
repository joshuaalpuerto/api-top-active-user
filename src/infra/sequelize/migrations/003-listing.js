'use strict'
module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.createTable('listings', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      name: {
        type: Sequelize.STRING(64),
        allowNull: false
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      created_by: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW')
      }
    }).then(() => {
      return queryInterface.sequelize.query(`
        ALTER TABLE "listings" ADD
        CONSTRAINT "listings_users_fkey"
        FOREIGN KEY ("created_by")
        REFERENCES "users" ("id")
        ON DELETE CASCADE;
      `)
    })
  },
  down: function (queryInterface) {
    return queryInterface.dropTable('listings')
  }
}
