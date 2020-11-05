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

describe('adding a new blog', () => {

    test('successful post', async () => {
        const newBlog = {
            title: 'Adding New Blog',
            author: 'Michelle Lee',
            url: 'https:12321.com',
            likes: 2
        }
                
        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)
    
        const response = await api.get('/api/blogs')
        expect(response.body.length).toBe(3)
        expect(response.body[2].author).toBe('Michelle Lee')
    })  
    
    test('defaults missing likes prop with value of 0', async () => {
        const newBlog = {
            title: 'Adding New Blog',
            author: 'Michelle Lee',
            url: 'https:12321.com'
        }

        await api
            .post('/api/blogs')
            .send(newBlog)
    
        const response = await api.get('/api/blogs')
        expect(response.body[2].likes).toBe(0)
    })  
})

afterAll(() => {
    mongoose.connection.close()
})