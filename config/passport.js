const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const User = require('../models/users')
const config = require('../config/database')

module.exports = function (passport) {
    let opts = {}
    opts.secretOrKey = config.secret
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('JWT')

    passport.use(new JwtStrategy(opts, function (jwt_payload, done) {
        User.getUserById(jwt_payload.user._id, (err, user) => {
            if (err) return done(err, false)

            if (user) {
                return done(null, user)
            } else {
                return done(null, false)
            }
        })
    }))
}