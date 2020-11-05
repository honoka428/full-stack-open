// File to declare all routes and requests to routes for Users Data

const usersRouter = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')

// Root route is equiv. to /api/users because of 
// app.use('/api/users/', usersRouter) declaration in app.js
usersRouter.get('/', (req, res) => {
    User
    .find({})
    .then(blogs => {
      res.json(blogs)
    })
})
  
usersRouter.post('/', async (request, response) => {
    const body = request.body
  
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(body.password, saltRounds)
  
    const user = new User({
      username: body.username,
      name: body.name,
      passwordHash,
    })
  
    const savedUser = await user.save()
  
    response.json(savedUser)
})

module.exports = usersRouter