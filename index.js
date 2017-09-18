const express = require('express')
const app = express()
const nunjucks = require('nunjucks')
const bodyParser = require('body-parser')
const session = require('express-session');
const flash = require('express-flash')
const passport = require('passport')
var responseTime = require('response-time')

const {
    db,
} = require('./pgp')

// =========set up body parser for post form =====
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}))


// =========set nunjuck engine template =======
nunjucks.configure('views', {
    autoescape: false,
    express: app,
    cache: true
});
app.engine('html', nunjucks.render);
app.set('view engine', 'html')

// ======== config sesstion =========
app.use(session({
    cookie: {
        maxAge: (3600 * 1000),
        secure: false
    },
    unser: 'destroy',
    secret: 'cart',
    resave: false,
    saveUninitialized: true
   
}));

app.use((req, res, next) => {
    if (req.isAuthenticated()) {
        req.session.login = true;
        req.session.user = req.user;
        // console.log('user=====');
        // console.log(req.session.user);
        // console.log(req.session);
    } else {
        req.session.login = false;
        req.session.user = {};
        // console.log(req.session.user);
    }
    next();
});
// =========== passport ======== 
app.use(passport.initialize())
app.use(passport.session())

// ======== flash ==========
app.use(flash())

// ====== respontime =========
app.use(responseTime())

// ========= use static file =========
const path = require('path')
app.use(express.static(__dirname + '/public'));

// ====== server start =====
require('./routers/local/local')(passport)
require('./routers/passport')(passport)
require('./routers/router')(app, express, passport)
const port = 3001

app.listen(port, () => {
    console.log('Listen 3001');
})


// ======= Handing err ======
app.use(function (err, req, res, next) {
  console.error(err.stack)
  res.status(500).send('Something broke!')
})