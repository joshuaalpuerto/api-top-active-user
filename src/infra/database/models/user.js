module.exports = function (sequelize, DataTypes) {
  const User = sequelize.define('users', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
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

  return User
}
