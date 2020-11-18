// File to initalize schema of document 
// to be saved in DB
const mongoose = require('mongoose')
var uniqueValidator = require('mongoose-unique-validator');

const userSchema = new mongoose.Schema({
    username: {
        type: String, 
        unique: true
    },
    name: String,
    passwordHash: String
  })

userSchema.plugin(uniqueValidator);
  
// customize response to return an id
// and delete _id and _v before return
userSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
        delete returnedObject.passwordHash
    }
})

module.exports = mongoose.model('User', userSchema)