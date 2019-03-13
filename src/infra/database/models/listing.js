module.exports = function (sequelize, DataTypes) {
  const Listing = sequelize.define('listings', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING(64),
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    created_by: {
      type: DataTypes.INTEGER,
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

  return Listing
}
