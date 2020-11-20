// File to initalize schema of document 
// to be saved in DB
const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema({
    blog: String,
    content: String
})

// customize response to return an id
// and delete _id and _v before return
commentSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Comment', commentSchema)