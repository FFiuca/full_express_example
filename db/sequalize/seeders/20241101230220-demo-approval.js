'use strict';

/** @type {import('sequelize-cli').Migration} */
const { User, Approval } = require('../models')
const { faker } = require('@faker-js/faker')

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */

    const u =  await User.findAll({
      // order : [
      //   ['id', 'ASC']
      // ],
    })

    // still don't knwo why can't add per userid
    // for(let j=0;j<u.length;j++){
    //   (async()=>{
    //     let d = []
    //     for(let i=1;i<=3;i++){
    //       d.push({
    //         user_id : u[j].id,
    //         request_reason: faker.word.words(2),
    //         status: 'pending',
    //       })
    //     }
    //     Approval.bulkCreate(d)
    //   })()
    // }

    let d = []
    u.forEach(el=>{
      for(let i=1;i<=3;i++){
        d.push({
          user_id : el.id,
          request_reason: faker.word.words(2),
          status: 'pending',
        })
      }
    })

    const add = await Approval.bulkCreate(d)
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */

    await queryInterface.bulkDelete('Approvals', null, {})
  }
};
