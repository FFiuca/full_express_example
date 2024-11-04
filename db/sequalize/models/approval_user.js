'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ApprovalUser extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  ApprovalUser.init({
    approval_id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER,
    status: {
      type: DataTypes.ENUM,
      values: ['approved', 'rejected', 'pending'],
      defaultValue: 'pending',
    }
  }, {
    sequelize,
    modelName: 'ApprovalUser', // it use to access instance through models/index.js
    tableName: 'approval_users',
    timestamps: true,
    paranoid: true, // softdelete
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at',
  });
  return ApprovalUser;
};
