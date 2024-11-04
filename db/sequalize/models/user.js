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
      // one to many
      User.hasMany(models.Approval, {
        foreignKey: 'user_id',
        sourceKey: 'id',
        as : 'approval'
      })

      User.hasMany(models.ApprovalComment, {
        foreignKey: 'user_id',
        sourceKey: 'id',
        as : 'approval_comment'
      })

      // many to many
      User.belongsToMany(models.Approval, {
        through: models.ApprovalUser,
        as: 'approval_user',
        foreignKey: 'user_id',
        otherKey: 'approval_id', // referenced table
        targetKey: 'id', // id for approval table
        sourceKey: 'id', // id for user table
        scope: {
          // status: 'active'
        }, // like where. can use polymorph or additional where params
        // hooks: true // activate like observer laravel
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
