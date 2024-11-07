// require('iconv-lite').encodingExists('foo')
const app = require('../app.js');
// const mongoose = require('mongoose');
const { faker } = require('@faker-js/faker');
const request = require("supertest");
const model = require('../db/sequalize/models');
const before = require('./before_all')
const after = require('./after_all');
const array_helper = require('../helpers/array_helper')
const { Op, QueryTypes } = require('sequelize');
const sequelize = require('../configs/db/sequalize_mysql')
// const sequelize =  require('../configs/db/sequalize_mysql')

const _request =  request(app);

beforeAll(async ()=>{
    before.init()
})

afterAll(()=>{
    after.init()
})

describe('sequelize test insert', ()=>{
    test('add user',  async ()=>{
        // console.log('ealah', model)
        const u = await model.User.create({
            username : 'test',
            name : 'test',
            password : 'test',
        })
        expect(u).not.toBeNull()
    })
})

describe('try relationship', ()=>{
    test('has one and belong to', async()=>{
        const u = await model.User.findOne()

        expect(u).not.toBeNull()

        const data_approval = []
        for(let i=0;i<3;i++)
            data_approval.push({
                user_id : u.id,
                status: array_helper.get_random_array(['pending','approved', 'rejected']),
                request_reason: 'test'
            })

        const approval = await model.Approval.bulkCreate(data_approval)
        expect(approval.length).toEqual(3)

        const rel = await u.getApproval()
        // console.log(rel)

        const u2 = await approval[0].getUser()
        // console.log(u2)

        const a2 = await u.getApproval({
            where :{
                status: 'pending'
            }
        })
        expect(a2.length>0).toEqual(true)

        // preload / lazy loading
        const u_all = await model.User.findAll({
            include : [
                'approval' // using as prop
            ]
        })
        expect(u_all[0].approval).not.toBeNull()
        // console.log(u_all[0].approval)

        const  u_all2 = await model.User.findAll({
            include: [
                {
                    association : 'approval', // if you set as in assocation use it
                    // model : model.Approval,
                    where : {
                        status: 'pending'
                    }
                }
            ]
        })
        const expect_u_all2 = await model.Approval.count({
            where : {
                status: 'pending',
                user_id: u_all2[0].id
            }
        })
        expect(u_all2[0].approval.length).toEqual(expect_u_all2)
    })

    test('nesteed include', async ()=>{
        const u = await model.User.findAll()

        expect(u).not.toBeNull()

        const data_approval = []
        for(let i=0;i<3;i++)
            data_approval.push({
                user_id : array_helper.get_random_array(u).id,
                status: array_helper.get_random_array(['pending','approved', 'rejected']),
                request_reason: 'test'
            })

        const approval = await model.Approval.bulkCreate(data_approval)
        expect(approval.length).toEqual(3)

        const data_comment = []
        for(let i=0;i<10;i++)
            data_comment.push({
                user_id: array_helper.get_random_array(u).id,
                approval_id : array_helper.get_random_array(approval).id,
                comment : faker.word.words({count:{min: 10, max:20}})
            })

        const comment = await model.ApprovalComment.bulkCreate(data_comment)
        expect(comment.length).toEqual(10)

        const approval2 =  await model.Approval.findAll({
            include: {
                association: 'approval_comment',
                include: {
                    association: 'user'
                },
                // required: false // convert to left join. if true be inner join
            }
        })
        // console.log(approval2)
        // console.log(approval2[0].approval_comment[0])
        expect(approval2[0].approval_comment[0].user).not.toBeNull()

        const approval3 = await model.Approval.findAll({
            include : {
                association: 'approval_comment',
                include: {
                    association: 'user',
                    where : {
                        username : {
                            [Op.like] : '%a%'
                        },

                        [Op.or] : {
                            username : {
                                [Op.like] : '%i%'
                            }
                        }
                    }
                },
                where : {}
            }
        })
        expect(approval3[0].approval_comment[0].user).not.toBeNull()

    })

    test('has many pivot table', async ()=>{
        const u = await model.User.findAll()

        expect(u).not.toBeNull()

        const data_approval = []
        for(let i=0;i<3;i++)
            data_approval.push({
                user_id : array_helper.get_random_array(u).id,
                status: array_helper.get_random_array(['pending','approved', 'rejected']),
                request_reason: 'test'
            })

        const approval = await model.Approval.bulkCreate(data_approval)
        expect(approval.length).toEqual(3)

        const data_approval_user = []
        for(let i=0;i<15;i++)
            data_approval_user.push({
                user_id: array_helper.get_random_array(u).id,
                approval_id: array_helper.get_random_array(approval).id
            })

        const approval_user = await model.ApprovalUser.bulkCreate(data_approval_user)
        expect(approval_user.length).not.toEqual(0)
        // console.log(approval_user)

        const a2 = await model.Approval.findOne({
            include : [
                {
                    association: 'approval_user'
                }
            ]
        })
        expect(a2.approval_user).not.toBeNull()
        // console.log(a2)

        const u2 = await model.User.findOne({
            include: [
                'approval_user'
            ]
        })
        expect(u2.approval_user).not.toBeNull()

    })

    test('raw sql', async()=>{
        const u = await model.User.findOne()

        // this is always return array with [result, meta]. but, for select just return one array
        const [result] = await sequelize.query("SELECT * FROM users WHERE id=:id OR id IN (:id_in)",
            {
                type: QueryTypes.SELECT,
                replacements: {
                    id : u.id,
                    id_in: [u.id, u.id]
                }
            }
        )
        // console.log(result)

        // when update check meta for affected_rows
        const [update, meta] = await sequelize.query("UPDATE users SET username=:test WHERE id=:id OR id IN (:id_in)",
            {
                type: QueryTypes.UPDATE,
                replacements: {
                    test: 'test',
                    id : u.id,
                    id_in: [u.id, u.id]
                }
            }
        )
        expect(meta > 0).toEqual(true)
        // console.log(update, meta)
    })
})
