module.exports = function (sequelize, DataTypes) {
  const Application = sequelize.define('applications', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    listing_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    cover_letter: {
      type: DataTypes.TEXT,
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

  return Application
}
