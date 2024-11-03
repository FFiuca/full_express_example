const app = require('../app');
const mongoose = require('mongoose');
const { faker } = require('@faker-js/faker');
const request = require("supertest");

const _request =  request(app);

afterAll(()=>{
    mongoose.disconnect() // nevermind if async. jest will wait till it executed
})

describe("test", ()=>{
    test("just test", async()=>{
        expect(true).toEqual(true)
    })
})

let token = ''

describe('test auth user positive', ()=>{
    let user = {}
    it('should create user and return user data', async ()=>{
        const res = await _request.post('/lnk/be/guest/auth/register')
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
        const res = await _request.post('/lnk/be/guest/auth/login')
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
        const res = await _request.get('/lnk/be/user/user/')
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
        const  res = await _request.post('/lnk/be/user/approval')
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
        const res = await _request.patch(`/lnk/be/user/approval/${approval._id}/approve`)
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
        const  res = await _request.post('/lnk/be/user/approval')
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
        const res = await _request.patch(`/lnk/be/user/approval/${approval._id}/reject`)
                            .set('Content-Type', 'application/json')
                            .set('Authorization', `Bearer ${token}`)
                            .send()

        expect(res.statusCode).toEqual(201)
        expect(res.body.data).toHaveProperty('status', 'rejected')
    })
})

describe('list all  approval', ()=>{
    it('shoul return list of approval', async()=>{
        const res = await _request.get(`/lnk/be/user/approval`)
                            .set('Authorization', `Bearer ${token}`)
                            .send()

        expect(res.statusCode).toEqual(200)
        expect(Array.isArray(res.body.data)).toEqual(true)
    })
})

