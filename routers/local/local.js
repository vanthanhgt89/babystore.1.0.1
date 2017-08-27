const User = require('../../models/user')

const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcryptjs')


module.exports = (passport) => {
    passport.use(new LocalStrategy(
        (username, password, done) => {
            User.findByNameUser(username)
                .then(data => {
                    if (data) {
                        bcrypt.compare(password, data.password, (err, res) => {
                             if (err) return done(err)
                            if (res) return done(null, data)
                            return done(null, false, {
                                message: 'Not correct  password'
                            })
                        })
                    } else {
                        return done(null, false, {
                            message: 'Username not exists'
                        })
                    }
                })
                .catch(err => {
                    return done(null, false, {
                        message: 'Not correct username'
                    })
                })
        }
    ))
}