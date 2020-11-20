// File to declare all routes and requests to routes for Users Data

const commentsRouter = require('express').Router()
const Comment = require('../models/comment')

// Root route is equiv. to /api/users because of 
// app.use('/api/comments/', commentsRouter) declaration in app.js
commentsRouter.get('/', (req, res) => {
    Comment
        .find({})
        .then(comments => {
        res.json(comments)
        })
})

commentsRouter.post('/', async(req, res, next) => {
    const body = req.body

    try {
        const comment = new Comment({
            blog: body.blog,
            content: body.comment
        })
    
        const savedComment = await comment.save()
        res.json(savedComment)
    }
    catch (err){
        next(err)
    }
})

module.exports = commentsRouter