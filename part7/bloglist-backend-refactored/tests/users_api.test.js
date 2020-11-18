const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const User = require('../models/user')

const api = supertest(app)

beforeEach(async () => {
    await User.deleteMany({})

    const userObjects = helper.initialUsers.map(user => new User(user))
    const promiseArray = userObjects.map(user => user.save())
    await Promise.all(promiseArray)
})

describe('creating users', () => {
    test('valid user is added', async() => {
        let newUser = {
            username: "sjones",
            name: "Smith Jones",
            password: "sdfsdfsd"
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(200)
            .expect("Content-Type", /application\/json/)
    })

    test('empty username or password returns error', async() => {
        let newUser = {
            username: '',
            name: "Smith Jones",
            password: ''
        }

        let result = await api
            .post('/api/users')
            .set("Content-Type", "application/json")
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        expect(result.body.error).toContain('username and password cannot be empty')
    })

    test('invalid password returns error', async() => {
        let newUser = {
            username: "shortpasswordUser",
            name: "Jones",
            password: '1'
        }

        let result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        expect(result.body.error).toContain('password must be 3 characters or longer')
    })

    test('invalid username returns error', async() => {
        let newUser = {
            username: "u",
            name: "invalid username",
            password: 'djkfhsd'
        }

        let result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        expect(result.body.error).toContain('username must be 3 characters or longer')
    })

    test('duplicate username returns error', async() => {
        let newUser = {
            username: "john4",
            name: "john",
            password: "dfjkdshfkjs"
        }

        let result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        expect(result.body.error).toContain('`username` to be unique')
    })    
})

afterAll(() => {
    mongoose.connection.close()
})