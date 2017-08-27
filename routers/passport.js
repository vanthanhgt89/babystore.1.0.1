const User = require('../models/user')

module.exports = (passport) => {
    passport.serializeUser((user, done) => {
        // console.log('serialize: ', user);
        done(null, user.username)
    })
    // serialize tra ve 
    //Dữ liệu ở deserializeUser trả về và lưu vào req.user
    passport.deserializeUser((user, done) => {
        // console.log('deserialize: ', user);
        User.findByNameUser(user)
            .then(data => {
                // console.log('=============');
                // console.log(data);
                done(null, data.username)
            })
            .catch(err => {
                done(null, user)
            })
    })
}