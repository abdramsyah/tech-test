'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // Users.hasOne(models.LimitValue, {
      //   as: 'limit_value',
      //   foreignKey: 'user_id',
      // });
    }
  }
  Users.init(
    {
      // auth
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      full_name: DataTypes.STRING,
      avatar: DataTypes.STRING,
      phone: DataTypes.STRING,
      address: DataTypes.TEXT,

      is_login: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: 'Users',
      tableName: 'Users',
    }
  );
  return Users;
};
