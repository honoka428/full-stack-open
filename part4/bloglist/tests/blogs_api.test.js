const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const Blog = require('../models/blog')

const api = supertest(app)


beforeEach(async () => {
    await Blog.deleteMany({})

    const blogObjects = helper.initialBlogs.map(blog => new Blog(blog))
    const promiseArray = blogObjects.map(note => note.save())
    await Promise.all(promiseArray)
})

test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
})

test('id is defined', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body[0].id).toBeDefined()
})

afterAll(() => {
    mongoose.connection.close()
})