const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const config = require('../config/database')

const userSchema = new mongoose.Schema({
    name: {
        type: String
    },
    email: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
})

const User = module.exports = mongoose.model('User', userSchema)

module.exports.getUserById = function (id, callback) {
    User.findById(id, callback)
}

module.exports.getUserByUsername = function (username, callback) {
    const query = { username: username }
    User.findOne(query, callback)
}

module.exports.addUser = function (newUser, callback) {
    bcrypt.hash(newUser.password, 10, (err, hash) => {
        if (err) { throw err }

        newUser.password = hash
        newUser.save(callback)
    })
}

module.exports.comparePassword = function (candidPassword, hash, callback) {
    bcrypt.compare(candidPassword, hash, (err, isMatch) => {
        if (err) throw err
        callback(null, isMatch)
    })
}
