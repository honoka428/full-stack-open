// File to declare all routes and requests to routes for Blogs Data

const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const logger = require('../utils/logger')

// Root route is equiv. to /api/blogs because of 
// app.use('/api/blogs/', blogsRouter) declaration in app.js
blogsRouter.get('/', (req, res) => {
  Blog
    .find({})
    .then(blogs => {
      res.json(blogs)
    })
})
  
blogsRouter.post('/', (req, res) => {
  if (req.body.likes == null) {
    req.body.likes = 0
  }

  else if (req.body.title == null && req.body.url == null) {
    return res.status(400).end()
  }

  const blog = new Blog(req.body)

  blog
    .save()
    .then(result => {
      res.status(201).json(result)
    })
})

blogsRouter.delete('/:id', async (req, res) => {
  await Blog.findOneAndDelete({id: req.id})
  
  res.status(204).end()
})

blogsRouter.post('/:id', async (req, res) => {
  const body = req.body // would be obj with new values

  await Blog.updateOne({author: body.author}, {likes: body.likes}) //Update specified author with the new likes
  res.json(Blog)
})

module.exports = blogsRouter