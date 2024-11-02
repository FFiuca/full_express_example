'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasMany(models.Approval, {
        foreignKey: 'user_id',
        as : 'approval'
      })
    }
  }

  User.init({
    username: DataTypes.STRING,
    name: DataTypes.STRING,
    password: DataTypes.STRING,
    status_active: DataTypes.BOOLEAN,
    created_at : {
      type: DataTypes.DATE,
      defaultValue:  DataTypes.NOW,
    },
    updated_at:{
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: null,
    },
    deleted_at:{
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: null,
    }

  }, {
    sequelize,
    modelName: 'User',
    paranoid: true,
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at',
  });
  return User;
};
