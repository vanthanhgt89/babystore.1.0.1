const {
    db,
} = require('./pgp')
const Menu = require('./models/menus')
const Products = require('./models/products')
const priceConver = require('./models/priceConver')
const redis = require('redis')
const bluebird = require('bluebird')
const client = redis.createClient()
bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);
client.on('connect', () => {

    console.log('connected');
})

  

db.task(t => {
    return t.batch([
        Menu.main_menu(),
        Menu.sub_menu(),
        Products.generalProductTop(6),
        Products.productTop(3, 6),
        Products.productTop(1, 6),
        Products.productTop(2, 6),
        Products.productTop(4, 6),
    ])
})
.then(data => {
    // console.log(data[0]);
// set up key cho 1 obj
client.hset('data','menu', JSON.stringify(data[0]))
// set up cho nhieu obj
client.hmset('key1', 'menu',JSON.stringify(data[0]),'menu1',JSON.stringify(data[2]))
client.hmset('key2', {'menu': '1', 'title': 2} )

// lay 1 truong trong key vua set up
client.HGET('data','menu', (err, result) => {
    if(err) console.log(err);
    // console.log(JSON.parse(result));
})

// lay toan bo cac truong khai bao
client.hgetall('key1', (err, result) => {
    if(err) console.log(err);
    // console.log(JSON.parse(result.menu1));
    // console.log(JSON.parse(result.menu));
})
client.hgetall('key2',(err, result) => {
     if(err) console.log(err);
    // console.log(JSON.parse(result.menu1));
    console.log(JSON.parse(result.menu));
})



})