module.exports = (app, express, passport) => {
    const home = require('./home')(express)
    app.use('/', home)

    const user = require('./user')(express, passport)
    app.use('/', user)

    
}