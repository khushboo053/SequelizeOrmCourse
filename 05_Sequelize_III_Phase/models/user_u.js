"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User_u extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User_u.belongsToMany(models.Role, {
        through: "UserRoles",
      });
    }
  }
  User_u.init(
    {
      name: DataTypes.STRING,
      email: DataTypes.STRING,
    },
    {
      timestamps: false,
      sequelize,
      modelName: "User_u",
    }
  );
  return User_u;
};
