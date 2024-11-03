// require('iconv-lite').encodingExists('foo')
const app = require('../app');
const mongoose = require('mongoose');
const { faker } = require('@faker-js/faker');
const request = require("supertest");
const model = require('../db/sequalize/models');
const before = require('./before_all')
const sequelize =  require('../configs/db/sequalize_mysql')

const _request =  request(app);

beforeAll(async ()=>{
    before.init()
})

afterAll(()=>{
    mongoose.disconnect() // nevermind if async. jest will wait till it executed
    sequelize.close()
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
