// require('iconv-lite').encodingExists('foo')
const app = require('../app');
// const mongoose = require('mongoose');
const { faker } = require('@faker-js/faker');
const request = require("supertest");
const model = require('../db/sequalize/models');
const before = require('./before_all')
const after = require('./after_all')
// const sequelize =  require('../configs/db/sequalize_mysql')

const _request =  request(app);

beforeAll(async ()=>{
    // await sequelize.sync({ // not sync with migration
    //     force: true
    // })

    // before.migration_drop()
    // before.migration_db_create()
    // before.migration_db_up()
    // before.seed_master()

    before.init()
})

afterAll(()=>{
    after.init()
})

describe("yuhu", ()=>{
    test("yoho", async()=>{
        expect(true).toEqual(true)
    })
})

// describe.only.each([
//     [1, 1, 2], // => [a, b, expected]
//     [1, 2, 3],
//     [2, 1, 3],
//   ])('.add(%i, %i)', (a, b, expected) => {
//     test(`returns ${expected}`, async () => {
//       expect(a + b).toBe(expected);
//     });
//   });

let token = ''

describe('test auth user positive', ()=>{
    let user = {}
    it('should create user and return user data', async ()=>{
        const res = await _request.post('/guest/auth/register')
                        .set('Content-Type', 'application/json')
                        .send({
                            username : faker.internet.userName(),
                            name : faker.person.fullName(),
                            password : '123456',
                            password_confirm: '123456'
                        })
        // console.log(res.statusCode, res.body)
        expect(res.statusCode).toEqual(201)
        expect(res.body.data).toHaveProperty('_id')

        user = res.body.data
    })


    it('should return 2* status code and token', async ()=>{
        const res = await _request.post('/guest/auth/login')
                        .set('Content-Type', 'application/json')
                        .send({
                            username : user.username,
                            password : '123456',
                        })
        expect(res.statusCode).toEqual(201)
        expect(res.body.data).toHaveProperty('token')

        token =  res.body.data.token

    })
})

describe('test list employees positive', ()=>{
    it('should return list of employess', async()=>{
        const res = await _request.get('/user/user/')
                        .set('Content-Type', 'application/json')
                        .set('Authorization', `Bearer ${token}`)
                        .send()

        expect(res.statusCode).toEqual(200)
        expect(Array.isArray(res.body.data)).toEqual(true)

        // console.log(res.body.data)
    })
})

describe('test create and approve approval', ()=>{
    let approval = {}
    it('should return  2* status code and approval data', async ()=>{
        const  res = await _request.post('/user/approval')
                            .set('Content-Type', 'application/json')
                            .set('Authorization', `Bearer ${token}`)
                            .send({
                                request_reason : 'i want use annual leave'
                            })

        expect(res.statusCode).toEqual(201)
        expect(res.body.data).toHaveProperty('_id')

        approval = res.body.data
    })

    it('should return 2* and data approved', async()=>{
        const res = await _request.patch(`/user/approval/${approval._id}/approve`)
                            .set('Content-Type', 'application/json')
                            .set('Authorization', `Bearer ${token}`)
                            .send()

        expect(res.statusCode).toEqual(201)
        expect(res.body.data).toHaveProperty('status', 'approved')
    })
})

describe('test create and reject approval', ()=>{
    let approval = {}
    it('should return  2* status code and approval data', async ()=>{
        const  res = await _request.post('/user/approval')
                            .set('Content-Type', 'application/json')
                            .set('Authorization', `Bearer ${token}`)
                            .send({
                                request_reason : 'i want use annual leave'
                            })

        expect(res.statusCode).toEqual(201)
        expect(res.body.data).toHaveProperty('_id')

        approval = res.body.data
    })

    it('should return 2* and data reject', async()=>{
        const res = await _request.patch(`/user/approval/${approval._id}/reject`)
                            .set('Content-Type', 'application/json')
                            .set('Authorization', `Bearer ${token}`)
                            .send()

        expect(res.statusCode).toEqual(201)
        expect(res.body.data).toHaveProperty('status', 'rejected')
    })
})

describe('list all  approval', ()=>{
    it('shoul return list of approval', async()=>{
        const res = await _request.get(`/user/approval`)
                            .set('Authorization', `Bearer ${token}`)
                            .send()

        expect(res.statusCode).toEqual(200)
        expect(Array.isArray(res.body.data)).toEqual(true)
    })
})

