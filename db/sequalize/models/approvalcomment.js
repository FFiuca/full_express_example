'use strict';
const {
  Model
} = require('sequelize');
const Approval = require('../../../models/approval_model');
module.exports = (sequelize, DataTypes) => {
  class ApprovalComment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      ApprovalComment.belongsTo(models.User, {
        foreignKey: 'user_id',
        targetKey: 'id',
        as: 'user',
      })
      ApprovalComment.belongsTo(models.Approval, {
        foreignKey: 'approval_id',
        targetKey: 'id',
        as : 'approval'
      })
    }
  }
  ApprovalComment.init({
    approval_id: DataTypes.NUMBER,
    comment: DataTypes.TEXT,
    user_id: DataTypes.NUMBER,
    created_at : {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    updated_at : {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: null
    },
    deleted_at : {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: null
    }
  }, {
    sequelize,
    modelName: 'ApprovalComment',
    tableName : 'approval_comments',
    timestamps: true,
    paranoid: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at'
  });
  return ApprovalComment;
};
