'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Approval extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Approval.belongsTo(models.User, {
        foreignKey : 'user_id', // foreign of parent table. look use belongTo,
        targetKey: 'id',
        as: 'user'
      })
      Approval.hasMany(models.ApprovalComment, {
        foreignKey: 'approval_id',
        sourceKey: 'id',
        as:  'approval_comment',
      })

      // many to many
      Approval.belongsToMany(models.User, {
        through: models.ApprovalUser,
        sourceKey: 'id', // this table
        targetKey: 'id', // related table
        foreignKey: 'approval_id',
        otherKey: 'user_id', // pivot constraint approval table
        as: 'approval_user'
      })
    }
  }
  Approval.init({
    user_id: DataTypes.BIGINT,
    status: DataTypes.STRING,
    request_reason: DataTypes.STRING,
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: null
    },
  }, {
    sequelize,
    modelName: 'Approval',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',

  });
  return Approval;
};
