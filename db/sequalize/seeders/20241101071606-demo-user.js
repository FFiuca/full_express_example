'use strict';
/** @type {import('sequelize-cli').Migration} */

const { faker } = require('@faker-js/faker');
const { hash_password } = require('./../../../services/auth_service')

module.exports = {
  async up (queryInterface, Sequelize) {

    const t = await queryInterface.sequelize.transaction()

    try{
      let data = []
      for(let i=0;i<3;i++)
        data.push({
          username : faker.internet.userName(),
          name : faker.person.fullName(),
          password : await hash_password('123456'),
          // password : '123456',
          status_active :  true,
          created_at : new Date(),
        })

        await queryInterface.bulkInsert('Users', data)
    }catch(e){
      await t.rollback()
      throw e
    }
  },

  async down (queryInterface, Sequelize) {

    const t = await queryInterface.sequelize.transaction()
    try{
      await queryInterface.bulkDelete('Users', null,  {});

      t.commit()
    }catch(e){
      t.rollback()
      throw e
    }
  }
};
