module.exports = (app, express, passport) => {
    const home = require('./home')(express)
    app.use('/', home)

    const user = require('./user')(express, passport)
    app.use('/', user)

    const product = require('./product')(express)
    app.use('/', product)

    
}