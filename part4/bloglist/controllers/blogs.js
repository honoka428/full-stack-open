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
  if (req.body.likes == undefined) {
    req.body.likes = 0
  }

  const blog = new Blog(req.body)

  blog
    .save()
    .then(result => {
      res.status(201).json(result)
    })
})

module.exports = blogsRouter