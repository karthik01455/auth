'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    static associate(models) {
    
    }
  }
  Users.init({
   
    emailId: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
   
    password: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Users',
  });
  return Users;
};
