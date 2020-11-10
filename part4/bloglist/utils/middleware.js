// File to handle errors that may arise in app 
const logger = require('./logger')

const requestLogger = (request, response, next) => {
  logger.info('Method:', request.method)
  logger.info('Path:  ', request.path)
  logger.info('Body:  ', request.body)
  logger.info('---')
  next()
}

// Helper function to grab web token from login request
const tokenExtractor = (req, res, next) => {
  const authorization = req.get('authorization') // get auth header content
  
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    console.log('request starts with bearer')
    req.token = authorization.substring(7) // remove 'bearer ' and return only token
  }

  next()
}

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, request, response, next) => {
  logger.error(error.name, error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  } else if (error.name === 'JsonWebTokenError') {
    return response.status(400).json({ error: `${error.name}: ${error.message}` })
  }

  next(error)
}

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
  tokenExtractor
}