// File to declare all routes and requests to routes for Users Data

const usersRouter = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')

// Root route is equiv. to /api/users because of 
// app.use('/api/users/', usersRouter) declaration in app.js
usersRouter.get('/', (req, res) => {
    User
    .find({})
    .then(users => {
      res.json(users)
    })
})
  
usersRouter.post('/', async (request, response, next) => {
    try {
        const body = request.body

        if (body.username.length == 0 || body.password.length == 0 ) {
            response.status(400).json({ error: 'username and password cannot be empty' })
        }

        else if (body.password.length < 3) {
            response.status(400).json({ error: 'password must be 3 characters or longer' })
        }

        else if (body.username.length < 3) {
            response.status(400).json({ error: 'username must be 3 characters or longer' })
        }

        else {
            const saltRounds = 10
            const passwordHash = await bcrypt.hash(body.password, saltRounds)
    
            const user = new User({
                username: body.username,
                name: body.name,
                passwordHash
            })
        
            const savedUser = await user.save()
            response.json(savedUser)
        }
    }
    catch(err){ next(err)}
})

module.exports = usersRouter