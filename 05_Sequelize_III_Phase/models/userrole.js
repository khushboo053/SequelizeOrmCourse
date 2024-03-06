'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserRole extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  UserRole.init({
    useruId: DataTypes.INTEGER,
    roleId: DataTypes.INTEGER
  }, {
    timestamps: false,
    sequelize,
    modelName: 'UserRole',
  });
  return UserRole;
};