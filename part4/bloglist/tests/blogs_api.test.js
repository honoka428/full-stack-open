const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const Blog = require('../models/blog')
const User = require('../models/user')

const api = supertest(app)


beforeEach(async () => {
    await Blog.deleteMany({})
    await User.deleteMany({})

    const user = {username: 'millie19', name: 'Millie Meyers', password: 'secret'}
    const saveTestUser = await api.post('/api/users/').send(user)

    const blogObjects = helper.initialBlogs.map(blog => new Blog(blog))
    const promiseArray = blogObjects.map(blog => blog.save()).concat(saveTestUser)
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

        // Login as sample user to grab token
        const loginResponse = await api
            .post('/api/login')
            .send({username: 'millie19', password: 'secret'})
        var TOKEN = loginResponse.body.token

        const newBlog = {
            title: 'Adding New Blog',
            author: 'Millie Meyers',
            url: 'https:12321.com',
            likes: 2
        }
        
        // Use token to create blog
        await api
            .post('/api/blogs')
            .set('Authorization', `Bearer ${TOKEN}`)
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)
    
        // Get updated blogs list and check new blog exists
        const response = await api.get('/api/blogs')
        expect(response.body.length).toBe(3)
        expect(response.body[2].author).toBe('Millie Meyers')
    })  
    
    test('defaults missing likes prop with value of 0', async () => {

        // Login as sample user to grab token
        const loginResponse = await api
            .post('/api/login')
            .send({username: 'millie19', password: 'secret'})

        var TOKEN = loginResponse.body.token

        const newBlog = {
            title: 'Adding New Blog',
            author: 'Michelle Lee',
            url: 'https:12321.com'
        }

        // Use token to create blog
        await api
            .post('/api/blogs')
            .set('Authorization', `Bearer ${TOKEN}`)
            .send(newBlog)

        const response = await api.get('/api/blogs')
        expect(response.body[2].likes).toBe(0)
    })  

    test('missing title and url returns 400 status', async () => {
        const newBlog = {
            author: 'Michelle Lee',
            likes: 2
        }

        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(400)
    })      
})

afterAll(() => {
    mongoose.connection.close()
})