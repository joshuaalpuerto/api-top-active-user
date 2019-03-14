'use strict'
const fs = require('fs')

module.exports = {
  up: function (queryInterface, Sequelize) {
    const sql = fs.readFileSync('src/infra/database/sp/sp-top-active-users.sql', 'utf8')
    return queryInterface.sequelize.query(sql)
  },
  down: function (queryInterface) {
    // return queryInterface.sequelize.query('')
  }
}
