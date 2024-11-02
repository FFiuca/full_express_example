'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
    *
    * Example:
    * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */

      const user = 'Users'
      queryInterface.renameColumn(user, 'createdAt', 'created_at')
      queryInterface.renameColumn(user, 'updatedAt', 'updated_at')
      queryInterface.renameColumn(user, 'deletedAt', 'deleted_at')
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */

      const user = 'Users'
      queryInterface.renameColumn(user, 'created_at', 'createdAt')
      queryInterface.renameColumn(user, 'updated_at', 'updatedAt')
      queryInterface.renameColumn(user, 'deleted_at', 'deletedAt')
  }
};
