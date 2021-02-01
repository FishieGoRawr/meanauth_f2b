const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const cors = require('cors')
const passport = require('passport')
const mongoose = require('mongoose')
const config = require('./config/database')
const User = require('./models/users')
const usersRoute = require('./routes/users')

// Mongoose setup
mongoose.connect(config.database, { useNewUrlParser: true, useUnifiedTopology: true }).catch(error => console.log(error))
mongoose.connection.on('connected', () => console.log('Connected to db', config.database))

const port = 3000
const app = express()

app.use(cors())

// Set static folder
app.use(express.static(path.join(__dirname, 'public')))

// Set body parser middleware
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

// Passport middleware
app.use(passport.initialize())
app.use(passport.session())
require('./config/passport')(passport)

// Routing
app.use('/users', usersRoute)

// Index route
app.get('/', (req, res) => {
    res.send('Invalid endpoint')
})

// Start server
app.listen(port, () => {
    console.log('Server started on port', port)
})