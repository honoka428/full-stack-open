// File to declare all routes and requests to routes for Blogs Data
const jwt = require('jsonwebtoken')
const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const logger = require('../utils/logger')

// Root route is equiv. to /api/blogs because of 
// app.use('/api/blogs/', blogsRouter) declaration in app.js
blogsRouter.get('/', async(req, res) => {
  const blogs = await Blog
    .find({}).populate('user', { username: 1, name: 1})
    res.json(blogs)  
})
  
blogsRouter.post('/', async(req, res, next) => {

  try {
    if (req.body.likes == null) {
      req.body.likes = 0
    }

    else if (req.body.title == null && req.body.url == null) {
      return res.status(400).end()
    }

    const blog = new Blog(req.body)
    const decodedToken = jwt.verify(req.token, process.env.SECRET) // validates token and returns {username, id, iad}

    const user = await User.findById(decodedToken.id)  
    console.log(user)
    blog.user = user
    const savedBlog = await blog.save()
    res.status(201).json(savedBlog)
  }
  catch(err){ next(err)}
})

blogsRouter.put('/:id', async (req, res) => {
  const body = req.body // would be obj with new values

  await Blog.updateOne({author: body.author}, {likes: body.likes}) //Update specified author with the new likes
  res.json(Blog)
})

blogsRouter.delete('/:id', async (req, res) => {
  console.log('inside delete')

  const id = req.params.id

  const result = await Blog.findByIdAndDelete(id)
  console.log(`Deleted: ${result}`)

  res.json(Blog)
})

module.exports = blogsRouter