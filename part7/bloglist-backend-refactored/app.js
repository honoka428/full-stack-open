const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const config = require('./utils/config')
const logger = require('./utils/logger')
const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const middleware = require('./utils/middleware')
const loginRouter = require('./controllers/login')
require('express-async-errors')


// Connection to mongodb. Initatied upon app start
logger.info('connecting to', config.MONGODB_URI)
mongoose
    .connect(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
    .then(() => {
        logger.info('connected to MongoDB')
    })
    .catch(() => {
        logger.error('error connecting to MongoDB:', error.message)
    })

// Declaration of middlewares to be used in app
app.use(cors()) // allow api connections from multiple endpoints
// app.use(express.static(build))
app.use(express.json()) // parse all json 
app.use(middleware.tokenExtractor) // make token field accessible from request.token from all routes
app.use('/api/blogs', blogsRouter) // use /api/blogs are root route for all requests in blogsRouter
app.use('/api/users', usersRouter) // use /api/users are root route for all requests in blogsRouter
app.use('/api/login', loginRouter) // use /api/login are root route for all requests in blogsRouter

if (process.env.NODE_ENV === 'test') {
    const testingRouter = require('./controllers/testing')
    app.use('/api/testing', testingRouter)
  }
  
app.use(middleware.requestLogger) // custom middleware for error handling and logging
app.use(middleware.errorHandler)
app.use(middleware.unknownEndpoint)
module.exports = app