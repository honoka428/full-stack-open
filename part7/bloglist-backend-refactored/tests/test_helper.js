// const Blog = require('../models/blog')

const initialBlogs = [
    {
        title: 'Test Title',
        author: 'John Doe',
        url: 'https:w.com',
        likes: 4
    },
    {
        title: 'Second Title',
        author: 'Smith Jones',
        url: 'https:rwefd.com',
        likes: 1
    },
]

const initialUsers = [
    {
        username: 'john4',
        name: 'John Doe',
        password: 'jpass'
    },
    {
        username: 'Sam2',
        name: 'Sam Doe',
        password: 'pass'
    }
]

module.exports = {initialBlogs, initialUsers}