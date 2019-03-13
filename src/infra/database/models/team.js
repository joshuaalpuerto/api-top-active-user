module.exports = function (sequelize, DataTypes) {
  const Team = sequelize.define('teams', {
    company_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    contact_user: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false
    }
  }, {
    hooks: {
    },
    freezeTableName: true,
    timestamps: false,
    classMethods: {
      associate () {
        // associations can be defined here
      }
    }
  })

  // https://github.com/sequelize/sequelize/issues/311
  // we create index after migrate
  Team.removeAttribute('id')

  return Team
}
