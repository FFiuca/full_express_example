const app = require('../app')

const { faker } = require('@faker-js/faker')
const request = require('supertest')
const models = require('../db/sequalize/models')
const before = require('./before_all')
const after = require('./after_all')
const { hash_password } = require('../services/auth_service')
const User = require('../models/user_model')
const Approval = require('../models/approval_model')
const mongoose = require('mongoose')

// const _request = request(app)

beforeAll(async ()=>{
    before.init()
})

afterAll(async ()=>{
    after.init()
})

describe('mastering mongoose test', ()=>{
    test('add docs approval', async ()=>{
        const data_user = {
            username :  faker.internet.userName(),
            name : faker.person.fullName(),
            password : await hash_password('1234'),
            status_active: true,
            created_at: new Date(),
            updated_at: new Date(),
        }

        const user = new User(data_user)
        const u = await  user.save()

        expect(u).not.toBeNull()

        const data_approval = {
            user: u._id,
            status: 'pending',
            request_reason : 'test',
            comments : [
                {
                    user: u._id,
                    text : 'hahah',
                    dummy : 'hehe',
                }
            ],
            dummy2 : [
                u._id,
                u._id,
            ]
        }
        // console.log(data_approval)
        const approval = new Approval(data_approval)
        const a = await  approval.save()

        const a2 = await Approval.find({
            user: u._id
        }).populate({
            path: 'user'
        })
        .populate('dummy2')
        .populate({
            path: 'comments.user',
            model: User,
            match: {
                // where param
            },
            // populating in ref doc
            // populate: {
            //     path: 'xxx'
            // }
        }).exec()
        expect(a2[0].comments[0].user).toHaveProperty('username')
        console.log(a2[0])


    })

    test('update mongo', async()=>{
        const session = await mongoose.startSession()
        try{
            session.startTransaction()

            const data_user = {
                username :  faker.internet.userName(),
                name : faker.person.fullName(),
                password : await hash_password('1234'),
                test:'test', // will not add
                status_active: true,
                created_at: new Date(),
                updated_at: new Date(),
            }

            const user = new User(data_user)
            const u = await  user.save()

            expect(u).not.toBeNull()

            const data_approval = {
                user: u._id,
                status: 'pending',
                request_reason : 'test',
                comments : [
                    {
                        user: u._id,
                        text : 'hahah',
                        dummy : 'hehe',
                    }
                ],
                dummy2 : [
                    u._id,
                    u._id,
                ]
            }
            // console.log(data_approval)
            const approval = new Approval(data_approval)
            const a = await  approval.save()

            const update = await Approval.updateOne({
                _id: a._id,
                // id: a.id, // cant id only in model layer
            }, {
                $set:{
                    status: 'approved'
                }
            })
            expect(update).not.toBeNull()
            // console.log(update)

            // replace will update entire doc. when column not specified to be set, the default value will be used
            // const replace = await  Approval.replaceOne({
            //     _id: a._id,
            // }, {
            //     status: 'approved'
            // })
            // expect(replace).not.toBeNull()
            // console.log(replace, a._id)


            await session.commitTransaction()
        }catch(e){
            await session.abortTransaction()
        }finally{
            await session.endSession()
        }
    })

    test('agregate function', async()=>{

    })
})
