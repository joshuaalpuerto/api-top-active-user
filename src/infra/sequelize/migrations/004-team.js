'use strict'
module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.createTable('teams', {
      company_id: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      contact_user: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        allowNull: false
      }
    }).then(() => {
      return queryInterface.sequelize.query(`
        ALTER TABLE "teams" ADD PRIMARY KEY ("company_id", "user_id");
      `)
    }).then(() => {
      return queryInterface.sequelize.query(`
        ALTER TABLE "teams" ADD
        CONSTRAINT "teams_companies_fkey"
        FOREIGN KEY ("company_id")
        REFERENCES "companies" ("id")
        ON DELETE CASCADE;
      `)
    }).then(() => {
      return queryInterface.sequelize.query(`
        ALTER TABLE "teams" ADD
        CONSTRAINT "teams_users_fkey"
        FOREIGN KEY ("user_id")
        REFERENCES "users" ("id")
        ON DELETE CASCADE;
      `)
    })
  },
  down: function (queryInterface) {
    return queryInterface.dropTable('teams')
  }
}
