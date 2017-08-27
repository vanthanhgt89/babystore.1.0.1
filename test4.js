// require the dependencies we installed
const express = require('express')
const app = express()
const nunjucks = require('nunjucks')
const bodyParser = require('body-parser')
const router = require('./routers/router')
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
    cache: false
});
app.engine('html', nunjucks.render);
app.set('view engine', 'html')

// ========= use static file =========
const path = require('path')
app.use(express.static(__dirname + '/public'));
const responseTime = require('response-time')
const axios = require('axios');
const redis = require('redis');

const bluebird = require('bluebird')

const RedisServer = require('redis-server');

// Simply pass the port that you want a Redis server to listen on.
// const server = new RedisServer(6379);
// server.open((err) => {
//   if (err === null) {
//     // You may now connect a client to the Redis
//     // server bound to `server.port` (e.g. 6379).
//   }
// });
// create a new redis client and connect to our local redis instance
const client = redis.createClient();
bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

// if an error occurs, print it to the console
client.on('connect', function () {
    console.log("connected ");
});

app.set('port', (process.env.PORT || 5000));
// set up the response-time middleware
app.use(responseTime());

// if a user visits /api/facebook, return the total number of stars 'facebook'
// has across all it's public repositories on GitHub
const middle = require('./redis')
app.get('/', (req, res, next) => {
    middle.getQueryCache('menu', next)
})



app.listen(app.get('port'), function () {
    console.log('Server listening on port: ', app.get('port'));
});